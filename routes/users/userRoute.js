const express = require("express");
const userRouter = express.Router();
const storage = require("../../config/cloudinary");
const {
  userRegisterCtrl,
  userLoginCtrl,
  userProfileCtrl,
  usersCtrl,
  updateCtrl,
  deleteCtrl,
  profilePhotoUploadCtrl,
} = require("../../controllers/users/userCtrl");
const isLogin = require("../../middlewares/isLogin");
const multer = require("multer");

// instance of multer
const upload = multer({ storage });

// POST/api/v1/users/register
userRouter.post("/register", userRegisterCtrl);

// POST/api/v1/users/login
userRouter.post("/login", userLoginCtrl);

// GET/api/v1/users
userRouter.get("/", usersCtrl);

// GET/api/v1/users/profile/:id
// verify token bearer
userRouter.get("/profile/", isLogin, userProfileCtrl);

// DELETE/api/v1/users/:id
userRouter.delete("/:id", deleteCtrl);

// PUT/api/v1/users/:id
userRouter.put("/:id", updateCtrl);

// POST/api/v1/users/:id
userRouter.post(
  "/profile-photo-upload",
  upload.single('profile'),
  profilePhotoUploadCtrl
);

module.exports = userRouter;
