const Vendor = require("../model/vendor-model");


exports.createVendor = async (req, res) => {
  try {

    // Extract filenames properly
    const certifications =
      req.files?.certifications?.map((file) => file.filename) || [];
    const certificates =
      req.files?.certificates?.map((file) => file.filename) || [];

    const vendor = new Vendor({
      ...req.body,
      certifications,
      certificates,
    });

    await vendor.save();

    res.status(201).json({ success: true, vendor });
  } catch (err) {
    console.error("Error creating vendor:", err);
    res
      .status(500)
      .json({
        success: false,
        message: "Error creating vendor",
        error: err.message,
      });
  }
};


// Get all vendors
exports.getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json({ success: true, vendors });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching vendors" });
  }
};

// Get single vendor
exports.getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ success: false, message: "Vendor not found" });
    res.json({ success: true, vendor });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching vendor" });
  }
};

// Update vendor
exports.updateVendor = async (req, res) => {
  try {
    const fileNames = req.files ? req.files.map((file) => file.filename) : [];
    const updatedData = {
      ...req.body,
    };

    if (fileNames.length > 0) {
      updatedData.$push = { documents: { $each: fileNames } };
    }

    const vendor = await Vendor.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!vendor) return res.status(404).json({ success: false, message: "Vendor not found" });

    res.json({ success: true, vendor });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error updating vendor" });
  }
};

// Delete vendor
exports.deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!vendor) return res.status(404).json({ success: false, message: "Vendor not found" });
    res.json({ success: true, message: "Vendor deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting vendor" });
  }
};
