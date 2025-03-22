import axios from 'axios'

const clientEmailSender = axios.create({
    baseURL: 'http://192.168.0.20:8080/send-email',
    timeout: 5000,
    headers: {'Content-Type': 'application/json'},
    
});

export default clientEmailSender;
