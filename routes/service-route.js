const express = require("express");
const router = express.Router();
const { createService, getServices } = require("../controller/service-controller");

router.post("/createservice", createService);
router.get("/getservices", getServices);

module.exports = router;
