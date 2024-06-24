const express = require("express");
const router = express.Router();
const {
  Login,
  Register,
  GetUser,
} = require("../controllers/authController.js");
const verifyAuth = require("../middleware/verifyAuth.js");

router.post("/login", Login);

router.post("/register", Register);

router.get("/user", verifyAuth, GetUser);

module.exports = router;
