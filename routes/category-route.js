const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const { addCategory, getCategories, deleteCategory, updateCategory } = require("../controller/category-controller");

// router.post("/addcategory",upload.single("categoryImage"),addCategory);
router.post("/addcategory", addCategory);
router.get("/getcategories", getCategories);
router.delete("/deletecategory/:id", deleteCategory);
router.put("/updatecategory/:id", upload.single("categoryImage"), updateCategory);

module.exports = router;
