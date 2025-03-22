import axios from 'axios'

const clientEmailSender = axios.create({
    baseURL: 'http://192.168.0.20:8080',
    timeout: 15000
});

export default clientEmailSender;
