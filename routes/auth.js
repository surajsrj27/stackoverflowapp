var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

//testroute
router.get("/testroute", isSignedIn, (req,res) => {
  res.json(req.auth);
})

//@type POST
//@route /api/auth/signup
//@desc registering user 
router.post(
    "/signup",
    [
      check("name", "name should be at least 3 char").isLength({ min: 3 }),
      check("email", "email is required").isEmail(),
      check("password", "password should be at least 3 char").isLength({ min: 3 })
    ],
    signup
  );

//@type POST
//@route /api/auth/signin
//@desc logging-in user
router.post(
    "/signin",
    [
      check("email", "email is required").isEmail(),
      check("password", "password field is required").isLength({ min: 1 })
    ],
    signin
  );

//@type POST
//@route /api/auth/signout
//@desc logging-out user
router.get("/signout", signout);

module.exports = router;