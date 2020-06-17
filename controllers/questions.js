const Question = require('../models/Question');
const Profile = require('../models/Profile');

//submiting questions
exports.submitQuestion = (req,res) => {
    req.body.user = req.profile;
    const question = new Question(req.body);
    question.save((err, question) => {
        if (err) {
          return res.status(400).json({
            error: "Failed to submit qestion into DB"
          });
        }
        res.json(question);
    });      
};

//showing all questions
exports.getAllQuestions = (req,res) => {
    Question.find()
      .sort({ createdAt: 'desc' })
      .then(questions => res.json(questions))
      .catch(err => res.json({noquestions:'No questions to display'}));
};

//get question by Id
exports.getQuestionById = (req, res, next, id) => {
  Question.findById(id)
    .exec((err, question) => {
      if (err) {
        return res.status(400).json({
          error: "NO question found"
        });
      }
      req.question = question;
      next();
    });
};

//showing single question
exports.getSingleQuestion = (req,res) => {
    const question = new Question(req.question)
    question.save()
        .then(question => res.json(question))
        .catch(err => res.json({error:'Problem in showing question'}));
};

//answering a question
exports.answeringAQuestion = (req,res) => {
  Question.findById(req.question._id)
            .then(question => {
                const newAnswer = {
                    user: req.profile._id,
                    name: req.body.name,
                    text: req.body.text
                };
                question.answers.unshift(newAnswer);

                question
                    .save()
                    .then(question => res.json(question))
                    .catch(err => res.json({error:'Problem in submitting question'}));
            })
            .catch(err => res.json({error:'Problem in fetching question'}));
};

//upvoting a question
exports.upvotingQuestion = (req,res) => {
  Profile.findOne({user: req.profile._id})
      .then(profile => {
          Question.findById(req.question._id)
              .then(question => {
                  if(question.upvotes.filter(upvote => upvote.user.toString() === 
                  req.profile._id.toString()).length > 0){
                      return res.status(400).json({noupvote: 'User already upvoted'})
                  }
                  question.upvotes.unshift({user: req.profile._id});
                  question
                      .save()
                      .then(question => res.json(question))
                      .catch(err => res.json({error:'Problem in submitting upvotes'}));
              })
              .catch(err => res.json({error:'Problem in fetching question'}));
      })
      .catch(err => res.json({error:'Problem in fetching profile'}));
}
  

