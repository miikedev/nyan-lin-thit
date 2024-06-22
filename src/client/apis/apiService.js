import axios from 'axios';
import { convertToDesiredFormat } from '../../utils/utils'
// const API_BASE_URL = 'https://be.nyanlynnthitanalytica.org/api/v1'; // Replace with your actual API base URL
// const instance = axios.create({
//   baseURL: API_BASE_URL
// });
// Fetch users from the API
export const fetchResources = async (type, page, category) => {
  console.log('type: ' + type)
  console.log('category: ' + category)
  const url = `/api/resources/type/${type.toUpperCase()}?page=${page}&limit=6&category=${
   category || ""
  }`
  console.log('url: '+ url)
  console.log('encoded uri',encodeURIComponent(category));
  const encodedURI = encodeURIComponent(category)
  console.log(encodedURI);
  try {
    const response = await axios.get(`/api/resources/type/${type.toUpperCase()}?page=${page}&limit=6&category=${
      category || ""
    }`);
    console.log('response',response.data)
    return response.data; // This will include the response data, status, and other information
  } catch (error) {
    // Handle or throw the error as needed
    console.error(`Error fetching :`, error);
    throw error;
  }
};

