const Profile = require("../models/Profile");

//savingProfile
exports.savingProfile = (req,res) => {
    const profileValues = {}
    profileValues.user = req.profile._id;
    if(req.body.username) profileValues.username = req.body.username;
    if(req.body.website) profileValues.website = req.body.website;
    if(req.body.country) profileValues.country = req.body.country;
    if(req.body.portfolio) profileValues.portfolio = req.body.portfolio;
    if(typeof req.body.languages !== undefined) {
        profileValues.languages = req.body.languages.split(",");
    }

    //getting social links
    profileValues.social = {};

    if(req.body.youtube) profileValues.social.youtube = req.body.youtube;
    if(req.body.facebook) profileValues.social.facebook = req.body.facebook;
    if(req.body.instagram) profileValues.social.instagram = req.body.instagram;

    //saving data into database
    Profile.findOne({user:req.profile._id})
        .then(profile => {
            if(profile){
                Profile.findOneAndUpdate(
                    {user:req.profile._id},
                    {$set: profileValues},
                    {new: true}
                )
                    .then(profile => res.json(profile))
                    .catch(err => console.log('problem in update' + err));
            } else {
                Profile.findOne({username: profileValues.username})
                    .then(profile => {
                        //Username already exists
                        if(profile) {
                           return res.status(400).json({username:'Username already exists'})
                        } 
                        //save user
                        new Profile(profileValues)
                            .save()
                            .then(profile => res.json(profile))
                            .catch(err => console.log(err));
                    })
                    .catch(err => console.log('Problem fetching username' + err));
            }
        })
        .catch(err => console.log('Problem in fetching profile' + err));
}

//gettingprofile
exports.gettingprofile = (req,res) => {
    Profile.findOne({user: req.profile._id})
            .then(profile => {
                if(!profile) {
                    return res.status(404).json({profilenotfound: 'No profile Found'})
                }
                res.json(profile);
            })
            .catch(err => console.log('got some error in profile' + err));
}

//get profile of every user
exports.getAllProfiles = (req,res) => {
    Profile.find()
        .populate("user", "name")
        .then(profiles => {
            if(!profiles){
                res.status(404).json({profilesenotfound: 'No profiles  was found'});
            }
            // res.json(profiles);
            res.json(profiles);
        })
        .catch(err => console.log('Error in fetching profiles' + err));
};
