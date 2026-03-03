const mongoose = require("mongoose");
require("dotenv").config();

const Role = require("./models/Role");

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");

    await Role.deleteMany({});

    await Role.insertMany([
      {
        name: "Admin",
        permissions: {
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      {
        name: "User",
        permissions: {
          create: true,
          read: true,
          update: true,
          delete: false
        }
      },
      {
        name: "Moderator",
        permissions: {
          create: false,
          read: true,
          update: true,
          delete: false
        }
      }
    ]);

    console.log("Roles seeded successfully ✅");
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });