// create post
const postPost = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "post created",
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
  postPost,
  postProfileCtrl,
  postsCtrl,
  deletePostCtrl,
  updatePostCtrl,
};
