import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();

// ✅ Auto-refresh token before making a request
axiosReq.interceptors.request.use(
    async (config) => {
        const accessToken = Cookies.get('my-app-auth');

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// ✅ Refresh token on 401 response
axiosRes.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const res = await axios.post(
                    '/dj-rest-auth/token/refresh/',
                    {},
                    { withCredentials: true }
                );
                const newAccessToken = res.data.access;

                Cookies.set('my-app-auth', newAccessToken, { expires: 1 });

                axios.defaults.headers.common[
                    'Authorization'
                ] = `Bearer ${newAccessToken}`;
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return axios(originalRequest);
            } catch (err) {
                console.error('❌ Token refresh failed:', err);
            }
        }

        return Promise.reject(error);
    }
);
