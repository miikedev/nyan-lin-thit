import axios from 'axios';
// Get the environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL 
const IS_PRODUCTION = import.meta.env.ENV === 'production';

// Create axios instance with the base URL
export const instance = axios.create({
  baseURL: API_BASE_URL
});

console.log(import.meta.env.VITE_API_BASE_URL)

// Fetch resources from the API
export const fetchResources = async (type, page, category, search) => {
  console.log(type, page, category, search);

  // Construct the URL depending on the environment
  const basePath = IS_PRODUCTION ? '' : '/api';
  const url = search === undefined 
    ? `${basePath}/resources/type/${type.toUpperCase()}?page=${page}&limit=6&category=${category || ""}`
    : `${basePath}/resources/type/${type.toUpperCase()}?page=${page}&limit=6&category=${category || ""}&search=${search}`;

  try {
    const response = IS_PRODUCTION ? await instance.get(url) : await axios.get(url);
    return response.data; // This will include the response data, status, and other information
  } catch (error) {
    // Handle or throw the error as needed
    console.error(`Error fetching:`, error);
    throw error;
  }
};

export const fetchDashboards = async() => {
  // console.log('fetch dashboard', paramString)
  try {
    const response = await axios(`/api/dashboard`)
    return response.data.dashboards[0];
  } catch (error) {
    console.log(error)
  }
}


