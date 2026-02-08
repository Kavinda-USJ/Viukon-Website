import axios from 'axios';

//const API_URL = 'http://localhost:5001/api';
const API_URL = 'https://viukon.com/api';
export const fetchSiteData = async () => {
  const response = await axios.get(`${API_URL}/sitedata`);
  return response.data;
};

export const updateSiteData = async (data: any) => {
  const response = await axios.put(`${API_URL}/sitedata`, data);
  return response.data;
};