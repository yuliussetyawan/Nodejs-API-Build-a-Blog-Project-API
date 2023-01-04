// post category
const postCategory = async (req, res) => {
    try {
      res.json({
        status: "success",
        data: "category created",
      });
    } catch (error) {
      res.json(error.message);
    }
  }

// category comment
const categoryProfileCtrl = async (req, res) => {
    try {
      res.json({
        status: "success",
        data: "category route",
      });
    } catch (error) {
      res.json(error.message);
    }
  }

// delete
const deleteCategoryCtrl = async (req, res) => {
    try {
      res.json({
        status: "success",
        data: "delete category route",
      });
    } catch (error) {
      res.json(error.message);
    }
  }

const updateCategoryCtrl = async (req, res) => {
    try {
      res.json({
        status: "success",
        data: "update category route",
      });
    } catch (error) {
      res.json(error.message);
    }
  }

module.exports = {
    postCategory,
    categoryProfileCtrl,
    deleteCategoryCtrl,
    updateCategoryCtrl,

}