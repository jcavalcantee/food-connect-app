import axios from 'axios';
import { ACCESS_IP_API } from '@env';

const registerCustomerClient = axios.create({
    baseURL: `${ACCESS_IP_API}:8083`,
    timeout: 10000
});

export default registerCustomerClient;
