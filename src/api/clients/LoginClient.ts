import axios from 'axios';

const ACCESS_IP_API = process.env.EXPO_PUBLIC_ACCESS_IP_API;

const clientLogin = axios.create({
    baseURL: `${ACCESS_IP_API}:8082`,
    timeout: 10000
}); 

export default clientLogin;