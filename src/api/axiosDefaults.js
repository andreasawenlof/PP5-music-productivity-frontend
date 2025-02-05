import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true; // Keep this if you’re using authentication

export const axiosReq = axios.create();
export const axiosRes = axios.create();
