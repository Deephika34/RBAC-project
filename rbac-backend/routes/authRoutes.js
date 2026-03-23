const express = require("express");
const router = express.Router();

// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    console.log("🔥 Register route hit");
    console.log("BODY:", req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // ✅ Temporary success response
    res.status(200).json({
      message: "Register successful"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    console.log("🔥 Login route hit");
    console.log("BODY:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required"
      });
    }

    // ✅ IMPORTANT: send token & role
    res.status(200).json({
      message: "Login successful",
      token: "dummy-token-123",
      role: "user"   // later DB la irundhu varum
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
});

module.exports = router;