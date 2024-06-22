import axios from 'axios';
import { convertToDesiredFormat } from '../../utils/utils'
// const API_BASE_URL = 'https://be.nyanlynnthitanalytica.org/api/v1'; // Replace with your actual API base URL
// const instance = axios.create({
//   baseURL: API_BASE_URL
// });
// Fetch users from the API
export const fetchResources = async (type, page, category) => {
  const url = `/api/resources/type/${type.toUpperCase()}?page=${page}&limit=6&category=${
   category || ""
  }`

  const encodedURI = encodeURIComponent(category)

  try {
    const response = await axios.get(`/api/resources/type/${type.toUpperCase()}?page=${page}&limit=6&category=${
      category || ""
    }`);
    return response.data; // This will include the response data, status, and other information
  } catch (error) {
    // Handle or throw the error as needed
    console.error(`Error fetching :`, error);
    throw error;
  }
};
