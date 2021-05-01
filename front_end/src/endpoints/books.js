import axios from 'axios';

export const loadBooks = (query) => axios.get('http://localhost:9080/books', { params: query })
.then(({ data }) => data);

export const loadSamples = () => axios.get('http://localhost:9080/books/samples').then(({ data }) => data);

export const rateSamples = (ratings) => axios.post('http://localhost:9080/books/bulk-rate', ratings).then(({ data }) => data);

export const rateBook = (ratings) => axios.post('http://localhost:9080/books/rate', ratings).then(({ data }) => data);
