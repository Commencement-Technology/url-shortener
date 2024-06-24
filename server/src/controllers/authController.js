const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

async function Login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        msg: "Please fill the required fields",
        success: false,
      });
    }

    let user = await User.findOne({ email }).select("+password");
    if (!user)
      return res.status(400).json({
        msg: "invalid credentials",
        success: false,
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        msg: "invalid credentials",
        success: false,
      });

    jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "10m",
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token,
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
}

async function Register(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({
        msg: "Please fill the required fields",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        msg: "User already exists",
        success: false,
      });
    }

    user = new User({
      username,
      email,
      password,
    });

    const slat = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, slat);
    await user.save();

    jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: 36000,
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token,
        });
      }
    );
  } catch (err) {
    console.log(`error in register: ${err}`);
    res.status(400).json({ success: false });
  }
}

async function GetUser(req, res) {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      user,
      success: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "SERVER ERROR" });
  }
}

module.exports = {
  Login,
  Register,
  GetUser,
};
