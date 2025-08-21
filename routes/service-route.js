const express = require("express");
const router = express.Router();
const { createService, getServices } = require("../controller/service-controller");

const { protect, allowRoles } = require("../middleware/auth-middleware");

router.post("/createservice", protect, allowRoles("admin"), createService);
router.get("/getservices", protect, allowRoles("admin"), getServices);

module.exports = router;
