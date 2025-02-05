import axios from 'axios';
import Cookies from 'js-cookie';

// ✅ Base API URL (Fixed)
axios.defaults.baseURL = 'http://127.0.0.1:8000/';

// ✅ Automatically attach access token if it exists
const accessToken = Cookies.get('my-app-auth');
if (accessToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

// ✅ Create instances for API requests
export const axiosReq = axios.create();
export const axiosRes = axios.create();

// ✅ Refresh Token Function (Proper Fix)
export const refreshToken = async () => {
    try {
        const res = await axios.post(
            '/dj-rest-auth/refresh/',
            {},
            { withCredentials: true }
        );
        const newAccessToken = res.data.access;
        Cookies.set('my-app-auth', newAccessToken, { expires: 1 });
        axios.defaults.headers.common[
            'Authorization'
        ] = `Bearer ${newAccessToken}`;
        return newAccessToken;
    } catch (err) {
        console.error('Token refresh failed:', err);
        throw err;
    }
};
