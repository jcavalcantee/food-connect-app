import axios from "axios";

const ACCESS_IP_API = process.env.EXPO_PUBLIC_ACCESS_IP_API;

const clientValidation = axios.create({
    baseURL: `${ACCESS_IP_API}:8080`,
    timeout: 15000
});

export default clientValidation;

