import axios from 'axios';

//DEVELOPER
axios.defaults.baseURL = 'http://localhost:8000'; // Change this if using a live server

//PRODUCTION
// axios.defaults.baseURL = 'https://mp-api-2f2442c94bb0.herokuapp.com'; // Change this if using a live server

axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
