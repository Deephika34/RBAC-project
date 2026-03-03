const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/auth");
const checkPermission = require("../middleware/permissionMiddleware");
const User = require("../models/User");

// ======================================
// GET ALL USERS (Admin Only)
// ======================================
router.get(
  "/users",
  verifyToken,
  checkPermission(["admin"]),
  async (req, res) => {
    try {
      const users = await User.find().select("-password");
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users" });
    }
  }
);

module.exports = router;