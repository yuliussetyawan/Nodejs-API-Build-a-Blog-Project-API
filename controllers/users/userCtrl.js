const User = require("../../model/User/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");
const getTokenFromHeader = require("../../utils/getTokenFromHeader");
const {appErr, AppErr} = require("../../utils/appErr");

// register
const userRegisterCtrl = async (req, res, next) => {
  const { firstname, lastname, profilePhoto, email, password } = req.body;
  try {
    // check if user exist
    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(new AppErr("User already exist", 500));
    }
    // hash password (npm i bcryptjs)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create the user
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    // create an instance of error class and passing it to global object
    next(appErr(error.message));
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
        msg: "Invalid login credentials",
      });
    }

    // verify password
    const isPasswordMatched = await bcrypt.compare(
      password,
      userFound.password
    );

    if (!isPasswordMatched) {
      return res.json({
        msg: "Invalid login credentials",
      });
    }

    res.json({
      status: "success",
      data: {
        firstname: userFound.firstname,
        lastname: userFound.lastname,
        email: userFound.email,
        isAdmin: userFound.isAdmin,
        token: generateToken(userFound._id),
      },
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
  // get user ID from userAuth, no need req.params anymore
  // console.log(req.userAuth);
  // const { id } = req.params;
  try {
    // get token from the header
    const token = getTokenFromHeader(req);
    console.log(token);
    const user = await User.findById(req.userAuth);
    res.json({
      status: "success",
      data: user,
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
