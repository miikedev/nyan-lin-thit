import axios from 'axios';  

// Get the environment variables  
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;  
const IS_PRODUCTION = import.meta.env.VITE_ENV === 'production';  

// Create axios instance with the base URL  
export const instance = axios.create({  
  baseURL: API_BASE_URL  
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

export const fetchDashboards = async (startDate, endDate) => {  
  try {  
    const { data } = await axios(constructUrl(`/dashboard`));  
    return data.dashboards[0];  
  } catch (error) {  
    console.log(`Error fetching dashboards:`, error);  
  }  
};  

export const fetchDashboardChart = async (startDate, endDate) => {  
  const paramString = (startDate !== 'Invalid Date' && endDate !== 'Invalid Date') ? `?startDate=${startDate}&endDate=${endDate}` : '';  
  try {  
    const { data } = await axios(constructUrl(`/dashboard/chart${paramString}`));  
    return data;  
  } catch (error) {  
    console.log(`Error fetching dashboard chart:`, error);  
  }  
};  

export const fetchDashboardMap = async (startDate, endDate) => {  
  const paramString = (startDate !== 'Invalid Date' && endDate !== 'Invalid Date') ? `?startDate=${startDate}&endDate=${endDate}` : '';  
  try {  
    const { data } = await axios(constructUrl(`/dashboard/map/${paramString}`));  
    return data;  
  } catch (error) {  
    console.log(`Error fetching dashboard map:`, error);  
  }  
};