import axios from 'axios';
console.log(import.meta.env.VITE_API_BASE_URL_DEV)
// Get the environment variables
const API_BASE_URL = import.meta.env.PROD 
    ? import.meta.env.VITE_API_BASE_URL_PROD 
    : import.meta.env.VITE_API_BASE_URL_DEV;

// Create axios instance with the base URL
export const instance = axios.create({
  baseURL: API_BASE_URL
});

// Fetch resources from the API
export const fetchResources = async (type, page, category, search) => {
  console.log(type, page, category, search);

  // Construct the URL depending on the environment
  const basePath = import.meta.env.PROD ? '' : '/api';
  const url = search === undefined 
    ? `${basePath}/resources/type/${type.toUpperCase()}?page=${page}&limit=6&category=${category || ""}`
    : `${basePath}/resources/type/${type.toUpperCase()}?page=${page}&limit=6&category=${category || ""}&search=${search}`;

  try {
    const response = await instance.get(url);
    return response.data; // This will include the response data, status, and other information
  } catch (error) {
    // Handle or throw the error as needed
    console.error(`Error fetching:`, error);
    throw error;
  }
};

export const fetchDashboards = async() => {
  console.log('fetch dashboard')
  try {
    const response = await axios('/api/dashboard')
    return response.data.dashboards;
  } catch (error) {
    console.log(error)
  }
}


