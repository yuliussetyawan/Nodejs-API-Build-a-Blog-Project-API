const express = require("express");
const userRouter = express.Router();
const {
  userRegisterCtrl,
  userLoginCtrl,
  userProfileCtrl,
  usersCtrl,
  updateCtrl,
  deleteCtrl,
} = require("../../controllers/users/userCtrl");

// POST/api/v1/users/register
userRouter.post("/register", userRegisterCtrl);

// POST/api/v1/users/login
userRouter.post("/login", userLoginCtrl);

// GET/api/v1/users
userRouter.get("/", usersCtrl);

// GET/api/v1/users/profile/:id
userRouter.get("/profile/:id", userProfileCtrl);

// DELETE/api/v1/users/:id
userRouter.delete("/:id", deleteCtrl);

// PUT/api/v1/users/:id
userRouter.put("/:id", updateCtrl);

module.exports = userRouter;
