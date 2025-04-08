import axios from 'axios';
import { ACCESS_IP_API } from '@env';

const clientLogin = axios.create({
    baseURL: `${ACCESS_IP_API}:8082`,
    timeout: 10000
}); 

export default clientLogin;