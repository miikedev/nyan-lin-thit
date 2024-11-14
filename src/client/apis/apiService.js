import axios from 'axios';

// Get the environment variables  
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;  
const IS_PRODUCTION = import.meta.env.VITE_ENV === 'production';  

// Create axios instance with the base URL  
export const instance = axios.create({  
  baseURL: API_BASE_URL,
  headers: {  
    'Access-Control-Allow-Origin': '*', // This header won't often be needed here  
    // You can add other custom headers here if needed  
}, 
});  

// Utility function to construct the URL  
const constructUrl = (path) => {  
  const basePath = IS_PRODUCTION ? '' : '/api';  
  return `${basePath}${path}`;  
};  

// Fetch resources from the API  
export const fetchResources = async (type, page, category, search) => {  
  const url = search === undefined   
    ? constructUrl(`/resources/type/${type.toUpperCase()}?page=${page}&limit=6&category=${category || ""}`)  
    : constructUrl(`/resources/type/${type.toUpperCase()}?page=${page}&limit=6&category=${category || ""}&search=${search}`);  
  
  try {  
    const response = IS_PRODUCTION ? await instance.get(url) : await axios.get(url);  
    return response.data; // This will include the response data, status, and other information  
  } catch (error) {  
    console.error(`Error fetching resources:`, error);  
    throw error;  
  }  
};  

// Fetch dashboards from the API  
export const fetchDashboards = async () => {  
  const url = constructUrl(`/dashboard`);  
  
  try {  
    const response = IS_PRODUCTION ? await instance.get(url) : await axios.get(url);  
    return response.data.dashboards[0];  
  } catch (error) {  
    console.error(`Error fetching dashboards:`, error);  
  }  
};  

// Fetch dashboard chart data from the API  
export const fetchDashboardChart = async (startDate, endDate) => {  
  const basePath = '/dashboard/chart';  
  const url = constructDashboardUrl(basePath, startDate, endDate);  

  
  try {  
    const response = IS_PRODUCTION ? await instance.get(url) : await axios.get(url);  
    return response.data;  
  } catch (error) {  
    console.error(`Error fetching dashboard chart:`, error);  
  }  
};  

// Fetch dashboard map data from the API  
export const fetchDashboardMap = async (startDate, endDate) => {  
  const basePath = '/dashboard/map';  
  const url = constructDashboardUrl(basePath, startDate, endDate);  

  
  try {  
    const response = IS_PRODUCTION ? await instance.get(url) : await axios.get(url);  
    return response.data;  
  } catch (error) {  
    console.error(`Error fetching dashboard map:`, error);  
  }  
};  

// Utility function to check if a date is valid  
const isValidDate = (date) => {  
  return date instanceof Date && !isNaN(date);  
};  

// Function to construct the URL  
const constructDashboardUrl = (basePath, startDate, endDate) => {  
  // Create the query string if dates are valid  
  const params = [];  
  
  if (isValidDate(startDate)) {  
    params.push(`startDate=${startDate.toISOString()}`);  
  }  
  
  if (isValidDate(endDate)) {  
    params.push(`endDate=${endDate.toISOString()}`);  
  }  
  
  // Join parameters with '&' if any  
  const paramString = params.length > 0 ? `?${params.join('&')}` : '';  
  
  return constructUrl(`${basePath}${paramString}`);  
};  