const express = require("express");
const router = express.Router();

const { registerCustomer } = require("../controller/Customer-Register-controller");
const upload = require("../middleware/multer"); // 👈 your multer config file

// Register route (with prescription upload)
router.post(
    "/customer-register",
    upload.single("prescriptionFile"),
    registerCustomer
);

module.exports = router;
