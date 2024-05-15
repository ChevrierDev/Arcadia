const https = require("https");
const fs = require("fs");
const app = require("./app");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT;

//web site pages routes
const accueilRouter = require("./src/routes/home/accueil.routes");
const serviceRouter = require("./src/routes/services/services.routes");
const habitatRouter = require("./src/routes/habitats/habitats.routes");
const contactRouter = require("./src/routes/contact/contact.routes");
const savannahRouter = require('./src/routes/savannah/savannah.routes')
const adminDashboardRouter = require("./src/routes/dashboard/admin/adminDash.routes");
const employeeDashboardRouter = require("./src/routes/dashboard/employee/employeeDash.routes");
const veterinarianDashboardRouter = require("./src/routes/dashboard/veterinarian/veterinarianDash.routes");

//Api routes
const foodAPIRouter = require("./src/api/v1/food/foodAPI.routes");
const serviceAPIRouter = require("./src/api/v1/services/serviceAPI.routes");
const habitatAPIRouter = require("./src/api/v1/habitat/habitatAPI.routes");
const consommationAPIRouter = require("./src/api/v1/consommation/consommationAPI.routes");
const animalAPIRouter = require("./src/api/v1/animal/animalAPI.routes");
const healthRecordAPIRouter = require("./src/api/v1/healthRecord/healthRecordAPI.routes");
const visitorReviewAPIRouter = require("./src/api/v1/visitorReview/visitorReview.routes");
const manageEmployeeAPIRouter = require("./src/api/v1/employee/manageEmployeeAPI.routes");
const manageVeterinarianAPIRouter = require("./src/api/v1/veterinarian/manageVeterinarianAPI.routes");
const animalViewsRouter = require('./src/api/v1/animal/animalViewsAPI.routes');
const testRouter = require('./src/api/v1/animal/animalTest.routes');


//login & logout router
const loginRouter = require("./src/auth/api.login");
const logoutRouter = require("./src/auth/api.logout");

//define website principales routes
app.use("/accueil", accueilRouter);
app.use("/services", serviceRouter);
app.use("/habitats", habitatRouter);
app.use("/contact", contactRouter);
app.use('/savannah', savannahRouter);

// users dashboards routes
app.use("/admin", adminDashboardRouter);
app.use("/employee", employeeDashboardRouter);
app.use("/veterinarian", veterinarianDashboardRouter);

//Arcadia API routes
app.use("/api/v1/services", serviceAPIRouter);
app.use("/api/v1/foods", foodAPIRouter);
app.use("/api/v1/habitats", habitatAPIRouter);
app.use("/api/v1/consommation", consommationAPIRouter);
app.use("/api/v1/animal", animalAPIRouter);
app.use("/api/v1/healthRecord", healthRecordAPIRouter);
app.use("/api/v1/visitorReview", visitorReviewAPIRouter);
app.use("/api/v1/manageEmployeeAccount", manageEmployeeAPIRouter);
app.use("/api/v1/manageVetrinarianAccount", manageVeterinarianAPIRouter);

app.use('/api/v1/animalCount/', animalViewsRouter);



//login logout features
app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter);

//connextion to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.log("Connexion à MongoDB échouée !", err));

//https options
const options = {
  key: fs.readFileSync(
    path.join(__dirname, "./certificates/localhost+2-key.pem")
  ),
  cert: fs.readFileSync(path.join(__dirname, "./certificates/localhost+2.pem")),
};

const server = https.createServer(options, app);
server.listen(PORT, async () => {
  console.log(`You are listening to port ${PORT}`);
});
