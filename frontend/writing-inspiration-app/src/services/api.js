import axios from 'axios';

const API_URL = 'http://localhost:5432/api/users-appone';

/*
    FILE PURPOSE:

    -   Contains functions to interact with the backend API
    -   backend API results came from the controller methods.

*/
export const registerUser = async (userData) => {
    try{
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};