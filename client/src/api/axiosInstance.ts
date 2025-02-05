import axios from 'axios';

const token = localStorage.getItem("Token");

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    headers:{
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`,
    }
});

export default axiosInstance;