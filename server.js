const https = require("https");
const fs = require('fs');
const app = require("./app");
const path = require('path')
require("dotenv").config();

const PORT = process.env.PORT;

const accueilRouter = require('./src/routes/home/accueil.routes');
const serviceRouter = require('./src/routes/services/services.routes');
const habitatRouter = require('./src/routes/habitat/habitats.routes');
const contactRouter = require('./src/routes/contact/contact.routes');

//define website principales routes
app.use('/accueil', accueilRouter);
app.use('/services', serviceRouter);
app.use('/habitats', habitatRouter);
app.use('/contact', contactRouter);


//https options
const options = {
  key: fs.readFileSync(path.join(__dirname, "./certificates/localhost+2-key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "./certificates/localhost+2.pem")),
};

const server = https.createServer(options,app);
server.listen(PORT, async () => {
  console.log(`You are listening to port ${PORT}`);
});
