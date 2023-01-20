const express = require("express");
const postRouter = express.Router();
const {
  createPostCtrl,
  postProfileCtrl,
  postsCtrl,
  deletePostCtrl,
  updatePostCtrl,
} = require("../../controllers/posts/postCtrl");
const isLogin = require("../../middlewares/isLogin");
isLogin;

// POST/api/v1/posts
postRouter.post("/", isLogin, createPostCtrl);

// GET/api/v1/post/:id
postRouter.get("/:id", postProfileCtrl);

// GET/api/v1/posts
postRouter.get("/", postsCtrl);

// DELETE/api/v1/posts/:id
postRouter.delete("/:id", deletePostCtrl);

// PUT/api/v1/posts/:id
postRouter.put("/:id", updatePostCtrl);

module.exports = postRouter;
