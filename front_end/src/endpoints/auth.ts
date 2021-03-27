import axios from 'axios';

export const register = (body: any) => 
    axios.post('http://localhost:9000/auth/register', body)
        .then(({ data }) => data);

export const login = (body: any) => 
    axios.post('http://localhost:9000/auth/login', body)
        .then(({ data }) => data);