const bCrypt = require("bcrypt");

// Function to hash a password
async function hashPassword(password) {
  try {
    // Hash the password with a salt round of 10
    const hash = await bCrypt.hash(password, 10);

    return hash;
  } catch (err) {
    return null;
  }
}

module.exports = hashPassword;
