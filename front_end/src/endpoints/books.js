import axios from 'axios';
import { BASE_URL } from './index';

export const loadBooks = (query) => axios.get(`${BASE_URL}/books`, { params: query })
.then(({ data }) => data);

export const loadSamples = () => axios.get(`${BASE_URL}/books/samples`).then(({ data }) => data);

export const rateSamples = (ratings) => axios.post(`${BASE_URL}/books/bulk-rate`, ratings).then(({ data }) => data);

export const rateBook = (ratings) => axios.post(`${BASE_URL}/books/rate`, ratings).then(({ data }) => data);
