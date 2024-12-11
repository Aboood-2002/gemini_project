const express = require("express");

const router = express.Router();

const { register, login, userProfile} = require("../controller/authController");

const { verifyToken } = require("../middlewares/verifyToken");




/**
 * @desc register new user
 * @route /api/auth/register
 * @method post
 * @access public
*/

router.post("/register", register );

/**
 * @desc login new user
 * @route /api/auth/login
 * @method post
 * @access public
*/

router.post("/login", login);
 

/**
 * @desc get user profile
 * @route /api/auth/
 * @method get
 * @access private
*/

router.get("/me", verifyToken ,userProfile);

module.exports = router;