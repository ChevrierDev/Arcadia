const http = require("http");
const fs = require("fs");
const app = require("./app");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

// Import website page routes
const accueilRouter = require("./src/routes/home/accueil.routes");
const serviceRouter = require("./src/routes/services/services.routes");
const habitatRouter = require("./src/routes/habitats/habitats.routes");
const contactRouter = require("./src/routes/contact/contact.routes");
const adminDashboardRouter = require("./src/routes/dashboard/admin/adminDash.routes");
const employeeDashboardRouter = require("./src/routes/dashboard/employee/employeeDash.routes");
const veterinarianDashboardRouter = require("./src/routes/dashboard/veterinarian/veterinarianDash.routes");

// Import API routes
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

// Import login & logout routes
const loginRouter = require("./src/auth/api.login");
const logoutRouter = require("./src/auth/api.logout");

// Define website main routes
app.use("/accueil", accueilRouter);
app.use("/services", serviceRouter);
app.use("/habitats", habitatRouter);
app.use("/contact", contactRouter);

// Define user dashboard routes
app.use("/admin", adminDashboardRouter);
app.use("/employee", employeeDashboardRouter);
app.use("/veterinarian", veterinarianDashboardRouter);

// Define Arcadia API routes
app.use("/api/v1/services", serviceAPIRouter);
app.use("/api/v1/foods", foodAPIRouter);
app.use("/api/v1/habitats", habitatAPIRouter);
app.use("/api/v1/consommation", consommationAPIRouter);
app.use("/api/v1/animal", animalAPIRouter);
app.use("/api/v1/healthRecord", healthRecordAPIRouter);
app.use("/api/v1/visitorReview", visitorReviewAPIRouter);
app.use("/api/v1/manageEmployeeAccount", manageEmployeeAPIRouter);
app.use("/api/v1/manageVetrinarianAccount", manageVeterinarianAPIRouter);
app.use('/api/v1/animalCount', animalViewsRouter);

// Define login & logout features
app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter);

app.get('/', (req, res) => {
  res.redirect('/accueil')
})

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connexion à MongoDB réussie !");
    
  
    
    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Connexion à MongoDB échouée !", err);
  });
