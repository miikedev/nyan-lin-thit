import axios from 'axios';
import { convertToDesiredFormat } from '../../utils/utils'
// const API_BASE_URL = 'https://be.nyanlynnthitanalytica.org/api/v1'; // Replace with your actual API base URL
// const instance = axios.create({
//   baseURL: API_BASE_URL
// });
// Fetch users from the API
export const fetchResources = async (type, page, category, search) => {
  console.log('type', type);
  console.log('search', search);
  const url = search ? 
  `/api/resources/type/${type.toUpperCase()}?search=${search}`:
  `/api/resources/type/${type.toUpperCase()}?page=${page}&limit=6&category=${category || ""}`
  try {
    const response = await axios.get(url);
    return response.data; // This will include the response data, status, and other information
  } catch (error) {
    // Handle or throw the error as neededm
    console.error(`Error fetching :`, error);
    throw error;
  }
};



