const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // check your User model path
require('dotenv').config();

// Step 1: connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {

    // Step 2: check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('Admin already exists ✅');
      mongoose.disconnect();
      return;
    }

    // Step 3: hash password
    const hashedPassword = await bcrypt.hash('Admin@123', 10);

    // Step 4: create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: '69997ac3d624252702a73b57' // <-- replace with your actual Admin role-id
    });

    await adminUser.save();
    console.log('✅ Admin user created successfully');

    mongoose.disconnect();
  })
  .catch(err => console.log(err));