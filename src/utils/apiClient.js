const axios = require("axios");

const https = require("https");

const agent = new https.Agent({
  rejectUnauthorized: false,
});

async function fetchEmployeeData() {
  try {
    const API_URL = "https://127.0.0.1:3000/api/v1/manageEmployeeAccount";
    const response = await axios.get(`${API_URL}`, { httpsAgent: agent });
    return response.data;
  } catch (error) {
    console.error("Error while getting data:", error);
    throw error;
  }
};

async function fetchVeterinarianData() {
  try {
    const API_URL = "https://127.0.0.1:3000/api/v1/manageVetrinarianAccount";
    const response = await axios.get(`${API_URL}`, { httpsAgent: agent });
    return response.data;
  } catch (error) {
    console.error("Error while getting data:", error);
    throw error;
  }
};


module.exports = { fetchEmployeeData, fetchVeterinarianData };
