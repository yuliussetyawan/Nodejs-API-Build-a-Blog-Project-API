const Post = require("../../model/Post/Post");
const User = require("../../model/User/User");

// create post
const createPostCtrl = async (req, res) => {
  const {title, description} = req.body;
  try {
    // find the user
    const author = await User.findById(req.userAuth);
    // create the post
    const postCreated = await Post.create({
      title,
      description,
      user: author._id,
    });
    // Associate user to a post -Push the post into the user posts field
    author.posts.push(postCreated);
    // save
    await author.save();
    res.json({
      status: "success",
      data: postCreated,
    });
  } catch (error) {
    res.json(error.message);
  }
};

// profile post
const postProfileCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "post route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

// all
const postsCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "all post route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

// delete
const deletePostCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "delete post route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

// update
const updatePostCtrl = async (req, res) => {
    try {
      res.json({
        status: "success",
        data: "update post route",
      });
    } catch (error) {
      res.json(error.message);
    }
  }

module.exports = {
  createPostCtrl,
  postProfileCtrl,
  postsCtrl,
  deletePostCtrl,
  updatePostCtrl,
};
