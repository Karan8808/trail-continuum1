import axios from 'axios';

const endpoint = "http://44.197.219.159:8000/api/requestleave/";

export const RequestLeave = async (userData) => {
    try {
        const response = await axios.post(endpoint, JSON.stringify(userData), {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } 
    
    catch(error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};