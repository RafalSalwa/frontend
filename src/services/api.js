import axios from 'axios';

// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://0.0.0.0:8001';
const API_BASE_URL = 'http://0.0.0.0:8000';
const api = axios.create({
    baseURL: API_BASE_URL,
});

export const registerUser = async (userData) => {
    return await api.post('/api/users/register', userData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
};

export const loginUser = async (userData) => {
    try {
    return await api.post('/api/users/login', userData,{
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
    });
    } catch (error) {
        if (error.response && error.response.status === 401) {
        } else if (error.message === 'JSON.parse: unexpected character at line 1 column 1 of the JSON data') {
            console.error('JSON parse error:', error);
        } else {
            console.error('Fetch user data error:', error);
        }
        throw error;
    }
};

export const fetchUser = async (token) => {
    try {
        console.log("token", token);
    return await api.get('/api/users/me', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    } catch (error) {
        if (error.response && error.response.status === 401) {
        } else if (error.message === 'JSON.parse: unexpected character at line 1 column 1 of the JSON data') {
            console.error('JSON parse error:', error);
        } else {
            console.error('Fetch user data error:', error);
        }
        throw error;
    }
};

export default api;