import axios from 'axios';
import { BASE_URL } from './index';

export const register = (body: any) => 
    axios.post(`${BASE_URL}/auth/register`, body)
        .then(({ data }) => data);

export const login = (body: any) => 
    axios.post(`${BASE_URL}/auth/login/`, body)
        .then(({ data }) => data);