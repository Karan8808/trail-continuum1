import axios from 'axios';

const apiEndpoint = "http://44.197.219.159:8000/api/";

const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(apiEndpoint + endpoint);
    return response.data;
  } 
  
  catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

const postData = async (endpoint, data) => {
  try {
    const response = await axios.post(apiEndpoint + endpoint, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } 
  
  catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const getEmpLeaves = async () => {
  return fetchData('employeeleaves/');
};

export const getHolidayList = async () => {
  return fetchData('holidays/');
};

export const RequestLeave = async (userData) => {
  return postData('requestleave/', userData);
};

export const getLeaveBalance = async (userData) => {
  return fetchData('leavebalance/', userData);
};
