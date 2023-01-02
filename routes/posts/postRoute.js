const express = require("express");

const postRouter = express.Router();

const {
  postPost,
  postProfileCtrl,
  postsCtrl,
  deletePostCtrl,
  updatePostCtrl,
} = require("../../controllers/posts/postCtrl");

// POST/api/v1/posts
postRouter.post("/", postPost);

// GET/api/v1/post/:id
postRouter.get("/:id", postProfileCtrl );

// GET/api/v1/posts
postRouter.get("/", postsCtrl);

// DELETE/api/v1/posts/:id
postRouter.delete("/:id", deletePostCtrl);

// PUT/api/v1/posts/:id
postRouter.put("/:id", updatePostCtrl);

module.exports = postRouter;
