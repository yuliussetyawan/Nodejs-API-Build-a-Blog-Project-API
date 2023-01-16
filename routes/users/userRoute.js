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
  whoViewedMyProfile,
  followingCtrl,
  unfollowCtrl,
  blockUsersCtrl,
  unblockUsersCtrl,
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

// GET/api/v1/users/profile-viewers/:id
userRouter.get("/profile-viewers/:id", isLogin, whoViewedMyProfile);

// GET/api/v1/users/following/:id
userRouter.get("/following/:id", isLogin, followingCtrl);

// GET/api/v1/users/unfollow/:id
userRouter.get("/unfollowing/:id", isLogin, unfollowCtrl);

// GET/api/v1/users/block/:id
userRouter.get("/block/:id", isLogin, blockUsersCtrl);

// GET/api/v1/users/unblock/:id
userRouter.get("/unblock/:id", isLogin, unblockUsersCtrl);

// POST/api/v1/users/:id
userRouter.post(
  "/profile-photo-upload",
  isLogin,
  upload.single("profile"),
  profilePhotoUploadCtrl
);

module.exports = userRouter;
