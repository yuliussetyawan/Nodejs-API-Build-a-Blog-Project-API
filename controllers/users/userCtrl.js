// register
const userRegisterCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "user registered",
    });
  } catch (error) {
    res.json(error.message);
  }
};

// login
const userLoginCtrl = async (req, res) => {
  try {
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
  deleteCtrl
};
