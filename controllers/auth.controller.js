const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    let user = await User.findOne({
      email,
    });
    if (user) {
      return res.status(400).json({
        msg: "User Already Exists",
      });
    }

    user = new User({
      firstName,
      lastName,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      "randomString",
      {
        expiresIn: 10000,
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          data: {
            user,
            accessToken: token,
          },
          message: "Register Successfully.",
        });
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in Saving");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({
      email,
    });
    if (!user)
      return res.status(400).json({
        message: "User Not Exist",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        message: "Incorrect Password !",
      });

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      "secret",
      {
        expiresIn: 3600000,
      },

      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          data: {
            user,
            accessToken: token,
          },
          message: "You are logged in successfully!",
        });
      }
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
