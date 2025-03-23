import axios from "axios";

const clientValidation = axios.create({
    baseURL: "http://192.168.0.20:8080",
    timeout: 15000
});

export default clientValidation;

