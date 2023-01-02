const express = require("express");

const commentRouter = express.Router();

const {
  postComment,
  commentProfileCtrl,
  deleteCommentCtrl,
  updateCommentCtrl,
} = require("../../controllers/comments/commentCtrl");

// POST/api/v1/comments
commentRouter.post("/", postComment);

// GET/api/v1/comments/:id
commentRouter.get("/:id", commentProfileCtrl);

// DELETE/api/v1/comments/:id
commentRouter.delete("/:id", deleteCommentCtrl);

// PUT/api/v1/comments/:id
commentRouter.put("/:id", updateCommentCtrl);

module.exports = commentRouter;
