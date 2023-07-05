import axios from 'axios';

const endpoint = "http://44.197.219.159:8000/api/employeeleaves/";

export const getEmpLeaves = async () => {
    try {
        const response = await axios.get(endpoint);
        return response.data;
    } 
    
    catch(error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};