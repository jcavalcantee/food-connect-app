import axios from "axios";
import { ACCESS_IP_API } from '@env';

const productClient = axios.create({
    baseURL: `${ACCESS_IP_API}:8084`,
    timeout: 20000
});

export default productClient;