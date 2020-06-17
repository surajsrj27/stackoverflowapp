const express = require("express");
const router = express.Router();

//controllers
const { 
    submitQuestion, 
    getAllQuestions, 
    getQuestionById, 
    getSingleQuestion,
    answeringAQuestion,
    upvotingQuestion } = require('../controllers/questions');

const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require('../controllers/user');

//params
router.param("userId", getUserById);
router.param("questId", getQuestionById);

//Actual routes

// /api/questions/testroute
router.get("/testroute", isSignedIn, (req,res) => res.json({"test":"testing question"}));

// @type POST
// @route /api/questions/askquestion/:userId
// @desc route to ask questions
// @access PRIVATE
router.post(
    '/askquestion/:userId',
    isSignedIn,
    isAuthenticated,
    submitQuestion
);

// @type GET
// @route /api/questions/showallquestion
// @desc route for showing all questions
// @access PUBLIC
router.get('/showallquestion', getAllQuestions);

// @type GET
// @route /api/questions/singlequestion/:questId
// @desc route for showing single question with questId
// @access PUBLIC
router.get('/singlequestion/:questId', getQuestionById, getSingleQuestion);

// @type POST
// @route /api/questions/:userId/answers/:questId
// @desc route for submiting answers to questions
// @access PRIVATE
router.post('/:userId/answers/:questId', getUserById, getQuestionById, answeringAQuestion);

// @type POST
// @route /api/questions/:userId/upvote/:questId
// @desc route for upvoting
// @access PRIVATE
router.post('/:userId/upvote/:questId', getUserById, getQuestionById, upvotingQuestion);

module.exports = router;