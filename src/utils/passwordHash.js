const bCrypt = require("bcrypt");

async function hashPassword(password) {
  try {
    const hash = await bCrypt.hash(password, 10);
    console.log(hash)
    return hash;
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = hashPassword;
