const express = require("express");
const app = express();
const userRouter = require("./routes/users/userRoute");
const postRouter = require("./routes/posts/postRoute");
const commentRouter = require("./routes/comments/commentRoute");
const categoryRouter = require("./routes/categories/categoryRoute");
const globalErrHandler  = require("./middlewares/globalErrHandler");
require("dotenv").config();
require("./config/dbConnect");

// middlewares
app.use(express.json()); // pass incoming payload

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
app.use(globalErrHandler);

// Error route not found
app.use("*", (req, res) => {
    console.log(req.originalUrl);
    res.status(404).json({
        message: `${req.originalUrl} - Route not found!`
    })
});

// Listen to server
const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`server is up and running on port ${PORT}`));
