const https = require("https");
const fs = require('fs');
const app = require("./app");
const path = require('path')
require("dotenv").config();

const PORT = process.env.PORT;

const options = {
  key: fs.readFileSync(path.join(__dirname, "./certificates/localhost+2-key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "./certificates/localhost+2.pem")),
};

const server = https.createServer(options,app);
server.listen(PORT, async () => {
  console.log(`You are listening to port ${PORT}`);
});
