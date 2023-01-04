const User = require("../../model/User/User");
const bcrypt = require("bcryptjs");

// register
const userRegisterCtrl = async (req, res) => {
  const { firstname, lastname, profilePhoto, email, password } = req.body;
  try {
    // check if user exist
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.json({
        msg: "User already exist",
      });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create the user
    const user = await User.create({
      firstname,
      lastname,
      email,
      password:hashedPassword,
    });

    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.json(error.message);
  }
};

// login
const userLoginCtrl = async (req, res) => {
  const { email, password } = req.body;
  try {
    // check if email exist
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.json({
        msg: "wrong login credentials",
      });
    }

    // validity of the password
    const isPasswordMatched = await User.findOne({ password });
    if (!isPasswordMatched) {
      return res.json({
        msg: "wrong login credentials",
      });
    }

    res.json({
      status: "success",
      data: "user login",
    });
  } catch (error) {
    res.json(error.message);
  }
};

// all
const usersCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "all users route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

// profile
const userProfileCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "profile route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

// update
const updateCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "update user route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

// delete
const deleteCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "delete user route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  userRegisterCtrl,
  userLoginCtrl,
  usersCtrl,
  userProfileCtrl,
  updateCtrl,
  deleteCtrl,
};
