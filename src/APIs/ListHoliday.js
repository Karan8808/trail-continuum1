import axios from 'axios';

const endpoint = "http://44.197.219.159:8000/api/holidays/";

export const getHolidayList = async () => {
    try {
        const response = await axios.get(endpoint);
        return response.data;
    } 
    
    catch(error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};