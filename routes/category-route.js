const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const { addCategory, getCategories, deleteCategory, updateCategory } = require("../controller/category-controller");
const { protect, allowRoles } = require("../middleware/auth-middleware");

// router.post("/addcategory",upload.single("categoryImage"),addCategory);
router.post("/addcategory", protect, allowRoles("admin"), addCategory);
router.get("/getcategories", protect, allowRoles("admin"), getCategories);
router.delete("/deletecategory/:id", protect, allowRoles("admin"), deleteCategory);
router.put("/updatecategory/:id", upload.single("categoryImage"), protect, allowRoles("admin"), updateCategory);

module.exports = router;
