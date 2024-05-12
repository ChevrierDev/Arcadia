const axios = require("axios");

const https = require("https");

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const he = require('he')

async function fetchEmployeeData() {
  try {
    const API_URL = "https://127.0.0.1:3000/api/v1/manageEmployeeAccount";
    const response = await axios.get(`${API_URL}`, { httpsAgent: agent });
    return response.data;
  } catch (error) {
    console.error("Error while getting data:", error);
    throw error;
  }
}

async function fetchVeterinarianData() {
  try {
    const API_URL = "https://127.0.0.1:3000/api/v1/manageVetrinarianAccount";
    const response = await axios.get(`${API_URL}`, { httpsAgent: agent });
    return response.data;
  } catch (error) {
    console.error("Error while getting data:", error);
    throw error;
  }
}

async function fetchServicesData() {
  try {
    const API_URL = "https://127.0.0.1:3000/api/v1/services";
    const response = await axios.get(`${API_URL}`, { httpsAgent: agent });
    return response.data;
  } catch (error) {
    console.error("Error while getting data:", error);
    throw error;
  }
}

async function fetchHabitatData() {
  try {
    const API_URL = "https://127.0.0.1:3000/api/v1/habitats";
    const response = await axios.get(`${API_URL}`, { httpsAgent: agent });
    return response.data;
  } catch (error) {
    console.error("Error while getting data:", error);
    throw error;
  }
}

async function fetchAnimalsData() {
  try {
    const API_URL = "https://127.0.0.1:3000/api/v1/animal";
    const response = await axios.get(`${API_URL}`, { httpsAgent: agent });
    return response.data;
  } catch (error) {
    console.error("Error while getting data:", error);
    throw error;
  }
}
async function fetchReviewsData() {
  try {
    const API_URL = "https://127.0.0.1:3000/api/v1/visitorReview";
    const response = await axios.get(`${API_URL}`, { httpsAgent: agent });
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error while getting data:", error);
    return []; 
  }
}


module.exports = {
  fetchEmployeeData,
  fetchVeterinarianData,
  fetchServicesData,
  fetchHabitatData,
  fetchAnimalsData,
  fetchReviewsData,
};
