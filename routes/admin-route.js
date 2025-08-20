const express = require('express');
const { signupAdmin, loginAdmin, admin, updateadmin } = require('../controller/admin-controller');
const router = express.Router();

// admin routes
router.post("/signupAdmin", signupAdmin);
router.post("/loginAdmin", loginAdmin);
router.get("/admin/:id", admin);
router.put("/updateadmin/:id", updateadmin);