const express = require("express");
const app = express();
require("dotenv").config();
require("./config/dbConnect");

// middlewares
// -----
// routes
// -----

//--------
// users route
//--------

// POST/api/v1/users/register
app.post("/api/v1/users/register", async () => {
  try {
    res.json({
      status: "success",
      data: "user registered",
    });
  } catch (error) {
    res.json(error.message);
  }
});
// POST/api/v1/users/login
app.post("/api/v1/users/login", async () => {
  try {
    res.json({
      status: "success",
      data: "user login",
    });
  } catch (error) {
    res.json(error.message);
  }
});

// GET/api/v1/users/:id
app.get("/api/v1/users/profile/:id", async () => {
  try {
    res.json({
      status: "success",
      data: "Profile route",
    });
  } catch (error) {
    res.json(error.message);
  }
});
// GET/api/v1/users
app.get("/api/v1/users", async () => {
  try {
    res.json({
      status: "success",
      data: "users route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

// DELETE/api/v1/users/:id
app.delete("/api/v1/users/:id", async () => {
  try {
    res.json({
      status: "success",
      data: "delete user route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

// PUT/api/v1/users/:id
app.put("/api/v1/users/:id", async () => {
  try {
    res.json({
      status: "success",
      data: "update user route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//--------
// post route
//--------

// POST/api/v1/posts
app.post("/api/v1/posts", async () => {
  try {
    res.json({
      status: "success",
      data: "post created",
    });
  } catch (error) {
    res.json(error.message);
  }
});

// GET/api/v1/post/:id
app.get("/api/v1/posts/:id", async () => {
  try {
    res.json({
      status: "success",
      data: "post route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

// GET/api/v1/posts
app.get("/api/v1/posts", async () => {
  try {
    res.json({
      status: "success",
      data: "posts route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

// DELETE/api/v1/posts/:id
app.delete("/api/v1/posts/:id", async () => {
  try {
    res.json({
      status: "success",
      data: "delete post route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

// PUT/api/v1/posts/:id
app.put("/api/v1/users/:id", async () => {
  try {
    res.json({
      status: "success",
      data: "update post route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//--------
// comments route
//--------

// POST/api/v1/comments
app.post("/api/v1/comments", async () => {
  try {
    res.json({
      status: "success",
      data: "comment created",
    });
  } catch (error) {
    res.json(error.message);
  }
});

// GET/api/v1/comments/:id
app.get("/api/v1/comments/:id", async () => {
  try {
    res.json({
      status: "success",
      data: "comment route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

// DELETE/api/v1/comments/:id
app.delete("/api/v1/comments/:id", async () => {
  try {
    res.json({
      status: "success",
      data: "delete comment route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

// PUT/api/v1/comments/:id
app.put("/api/v1/comments/:id", async () => {
  try {
    res.json({
      status: "success",
      data: "update comment route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//--------
// categories route
//--------

// POST/api/v1/categories
app.post("/api/v1/categories", async () => {
  try {
    res.json({
      status: "success",
      data: "category created",
    });
  } catch (error) {
    res.json(error.message);
  }
});

// GET/api/v1/categories/:id
app.get("/api/v1/categories/:id", async () => {
  try {
    res.json({
      status: "success",
      data: "category route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

// DELETE/api/v1/categories/:id
app.delete("/api/v1/categories/:id", async () => {
  try {
    res.json({
      status: "success",
      data: "delete category route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

// PUT/api/v1/categories/:id
app.put("/api/v1/categories/:id", async () => {
  try {
    res.json({
      status: "success",
      data: "update category route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

// Error handlers middleware
// Listen to server
const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`server is up and running on port ${PORT}`));
