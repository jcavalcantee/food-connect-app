import axios from "axios";
import { ACCESS_IP_API } from '@env';

const clientValidation = axios.create({
    baseURL: `${ACCESS_IP_API}:8080`,
    timeout: 15000
});

export default clientValidation;

