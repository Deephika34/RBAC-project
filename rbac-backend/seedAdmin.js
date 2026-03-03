const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
dotenv.config();

const User = require("./models/User");
const Role = require("./models/Role");

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

async function createAdmin() {
  try {
    const adminRole = await Role.findOne({ name: "Admin" });
    if (!adminRole) return console.log("Admin role not found");

    const existingAdmin = await User.findOne({ email: "admin@example.com" });
    if (existingAdmin) return console.log("Admin already exists");

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const adminUser = new User({
      username: "admin",
      email: "admin@example.com",
      password: hashedPassword,
      roles: [adminRole._id]
    });

    await adminUser.save();
    console.log("Admin user created successfully");
    mongoose.disconnect();
  } catch (err) {
    console.log(err);
  }
}

createAdmin();