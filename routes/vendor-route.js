const express = require("express");
const router = express.Router();
const vendorController = require("../controller/vendor-controller");
const upload = require("../middleware/multer"); // your multer config

// Create vendor (with multiple file uploads allowed)
router.post("/create-vendor",  upload.fields([
        { name: "certifications", maxCount: 1 },
        { name: "certificates", maxCount: 1 }
    ]), vendorController.createVendor);

// Get vendors
router.get("/allvendor", vendorController.getVendors);

// Get single vendor
router.get("/:id", vendorController.getVendorById);

// Update vendor
router.put("/:id",  upload.fields([
        { name: "certifications", maxCount: 1 },
        { name: "certificates", maxCount: 1 }
    ]),  vendorController.updateVendor);

// Delete vendor
router.delete("/:id", vendorController.deleteVendor);

module.exports = router;
