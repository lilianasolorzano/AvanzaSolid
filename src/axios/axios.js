// src/axios.js
import axios from 'axios';

const APIavanzaSolid = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', 
  timeout: 1000, // Opcional: tiempo máximo de espera para una solicitud
});

export default  APIavanzaSolid;
