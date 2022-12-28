const express = require("express");
const app = express();
const userRouter = require("./routes/users/userRoute");
const postRouter = require("./routes/posts/postRoute");
const commentRouter = require("./routes/comments/commentRoute");
const categoryRouter = require("./routes/categories/categoryRoute");
require("dotenv").config();
require("./config/dbConnect");

// middlewares
// -----
// routes
// -----

//--------
// users route
//--------
app.use("/api/v1/users", userRouter);

//--------
// post route
//--------
// POST/api/v1/posts
app.use("/api/v1/posts", postRouter);

//--------
// comments route
//--------
app.use("/api/v1/comments", commentRouter);

//--------
// categories route
//--------
app.use("/api/v1/categories", categoryRouter);

// Error handlers middleware
// Listen to server
const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`server is up and running on port ${PORT}`));
