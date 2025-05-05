import axios from "axios";

const ACCESS_IP_API = process.env.EXPO_PUBLIC_ACCESS_IP_API;

const productClient = axios.create({
    baseURL: `${ACCESS_IP_API}:8084`,
    timeout: 20000
});

export default productClient;