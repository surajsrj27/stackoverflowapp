const express = require("express");
const router = express.Router();

// controllers
const { savingProfile, gettingprofile, getAllProfiles } = require('../controllers/profile');

const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require('../controllers/user');

// params
router.param("userId", getUserById);

//Actual routes /api/profile

//testroute
router.get("/testroute", isSignedIn, (req,res) => res.json({"test":"testing profile"}));

// @type POST
// @route /api/profile/saveprofile/:userId
// @desc route for UPDATING/SAVING personnal user profile
// @access PRIVATE
router.post('/saveprofile/:userId',
    isSignedIn,
    isAuthenticated,
    savingProfile
);

//@type GET
//@route /api/profile/getprofile/:userId
//@desc route for personal user Profile
//@access PRIVATE
router.get('/getprofile/:userId', 
    isSignedIn,
    isAuthenticated,
    gettingprofile
);

// @type GET
// @route /api/profile/allprofiles
// @desc route for getting user profile of everyone
// @access PUBLIC
router.get('/allprofiles', getAllProfiles);

module.exports = router;