const express = require("express");
const router = express.Router();
const adminModel = require("../models/admin.model");

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const savedUser = await adminModel.registreAdmin({
      username,
      email,
      password,
    });
    res.status(200).json({ user: savedUser, msg: "Admin added successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message || "Failed to register admin" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await adminModel.loginAdmin({ email, password });
    res.status(200).json(token);
  } catch (err) {
    res.status(400).json({ error: err.message || "Login failed" });
  }
});

module.exports = router;
