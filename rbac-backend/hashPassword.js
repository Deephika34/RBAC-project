const bcrypt = require("bcryptjs");

async function run() {
  const hashed = await bcrypt.hash("123456", 10);
  console.log(hashed);
}

run();