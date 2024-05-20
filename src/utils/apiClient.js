const axios = require("axios");
const db = require("../config/db");
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

// Function to fetch employee data from the API
async function fetchEmployeeData() {
  try {
    const query = 'SELECT * FROM employee'; 
    const { rows } = await db.query(query);
    console.log(rows)
    return rows || [];
  } catch (error) {
    console.error("Error while getting data:", error);
    throw error;
  }
}

// Fonction pour récupérer les données des vétérinaires directement depuis la base de données
async function fetchVeterinarianData() {
  try {
    const query = 'SELECT * FROM veterinarian'; 
    const { rows } = await db.query(query);
    return rows || [];
  } catch (error) {
    console.error("Error while getting data:", error);
    throw error;
  }
}


// Fonction pour récupérer les données des services directement depuis la base de données
async function fetchServicesData() {
  try {
    const query = 'SELECT * FROM service'; 
    const { rows } = await db.query(query);
    return rows || [];
  } catch (error) {
    console.error("Error while getting data:", error);
    throw error;
  }
}



// Function to fetch all habitats data from the API and process image paths
async function fetchHabitatData() {
  try {
    const query = 'SELECT * FROM habitats'; 
    const { rows } = await db.query(query);
    return rows || [];
  } catch (error) {
    console.error("Error while getting data:", error);
    throw error;
  }
}

// Function to fetch all animals data from the database and join with habitats data
async function fetchAnimalsData() {
  try {
    const query = `
      SELECT 
        animal.*, 
        habitat.name AS habitat_name 
      FROM 
        animal
      JOIN 
        habitat ON animal.habitat_id = habitat.habitat_id;
    `;
    const { rows } = await db.query(query);


    return rows;
  } catch (error) {
    console.error("Error fetching animals with habitats:", error);
    throw error;
  }
}

// Function to fetch health reports data from the database and join with related data
async function fetchHealthReportData() {
  try {
    const query = `
      SELECT 
        hr.*, 
        a.name AS animal_name, 
        h.name AS habitat_name, 
        h.habitat_id, 
        v.first_name, 
        v.last_name
      FROM 
        health_record hr
      JOIN 
        animal a ON hr.animal_id = a.animal_id
      JOIN 
        habitat h ON a.habitat_id = h.habitat_id
      JOIN 
        veterinarian v ON hr.veterinarian_id = v.veterinarian_id;
    `;
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    console.error("Error fetching health reports:", error);
    throw error;
  }
}

// Function to fetch consumption reports data from the database and join with related data
async function fetchConsommationReportData() {
  try {
    const query = `
      SELECT 
        c.consommation_id,
        c.date,
        c.heure,
        c.grammage,
        a.name AS animal_name,
        e.first_name AS employee_first_name,
        e.last_name AS employee_last_name,
        f.name AS food_name
      FROM 
        consommation c
      JOIN 
        animal a ON c.animal_id = a.animal_id
      JOIN 
        employee e ON c.employee_id = e.employee_id
      JOIN 
        food f ON c.food_id = f.food_id;
    `;
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    console.error("Error fetching consumption reports:", error);
    throw error;
  }
}

// Function to fetch all visitor reviews from the API
async function fetchReviewsData() {
  try {
    const query = 'SELECT * FROM review';
    const { rows } = await db.query(query);
    return rows || [];
  } catch (error) {
    console.error("Error while getting data:", error);
    throw error;
  }
}

// Function to fetch all food data from the API
async function fetchFoodData() {
  try {
    const query = 'SELECT * FROM food'; 
    const { rows } = await db.query(query);
    return rows || [];
  } catch (error) {
    console.error("Error while getting data:", error);
    throw error;
  }
}

module.exports = {
  fetchEmployeeData,
  fetchVeterinarianData,
  fetchServicesData,
  fetchHabitatData,
  fetchAnimalsData,
  fetchReviewsData,
  fetchFoodData,
  fetchHealthReportData,
  fetchConsommationReportData
};
