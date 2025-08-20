const express = require("express");
const upload = require("../middleware/multer");
const { getReviews, createReview, updateReview } = require("../controller/review-controller");
const router = express.Router();

router.post("/createreviews", upload.single("image"), createReview);
router.get('/getreview',getReviews);
router.put("/updatereviews/:id", upload.single("image"), updateReview);
module.exports = router;
