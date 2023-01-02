const express = require("express");
const { postCategory, categoryProfileCtrl, deleteCategoryCtrl, updateCategoryCtrl } = require("../../controllers/categories/categoryCtrl");
const categoryRouter = express.Router();

// POST/api/v1/categories
categoryRouter.post("/", postCategory);

// GET/api/v1/categories/:id
categoryRouter.get("/:id", categoryProfileCtrl);

// DELETE/api/v1/categories/:id
categoryRouter.delete("/:id", deleteCategoryCtrl);

// PUT/api/v1/categories/:id
categoryRouter.put("/:id", updateCategoryCtrl);

module.exports = categoryRouter;
