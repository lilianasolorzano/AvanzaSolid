// src/axios.js
import axios from 'axios';

const APIavanzaSolid = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // Cambia esto por la URL base de la API que estás usando
  timeout: 1000, // Opcional: tiempo máximo de espera para una solicitud
});

export default  APIavanzaSolid;
