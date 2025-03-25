import { useNavigate } from 'react-router-dom';
import {
    setTokenTimestamp,
    shouldRefreshToken,
    removeTokenTimestamp,
} from '../utils';
import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from 'react';
import { axiosReq, axiosRes } from '../api/axiosDefaults';
import Cookies from 'js-cookie';

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const refreshToken = useCallback(async () => {
        try {
            const res = await axiosReq.post('/dj-rest-auth/token/refresh/', {
                withCredentials: true,
            });

            setTokenTimestamp(res.data);
            const newToken = res.data.access;
            Cookies.set('my-app-auth', newToken, { expires: 1 });
            axiosReq.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${newToken}`;
            axiosRes.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${newToken}`;
            return newToken;
        } catch (err) {
            console.error('Failed to refresh token:', err);
            throw err;
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            await axiosReq.post('/dj-rest-auth/logout/');
        } catch (err) {
            console.error('Logout failed:', err);
        } finally {
            Cookies.remove('my-app-auth');
            removeTokenTimestamp();
            setUser(null);
            delete axiosReq.defaults.headers.common['Authorization'];
            delete axiosRes.defaults.headers.common['Authorization'];
            navigate('/');
        }
    }, [navigate]);

    const login = useCallback(async (username, password) => {
        try {
            const res = await axiosReq.post('/dj-rest-auth/login/', {
                username,
                password,
            });
            if (res.data && typeof res.data.access === 'string') {
                Cookies.set('my-app-auth', res.data.access, { expires: 1 });
                setTokenTimestamp(res.data);
                setUser(res.data.user);
                axiosReq.defaults.headers.common[
                    'Authorization'
                ] = `Bearer ${res.data.access}`;
                axiosRes.defaults.headers.common[
                    'Authorization'
                ] = `Bearer ${res.data.access}`;
                return res.data;
            } else {
                throw new Error('Invalid access token in response data');
            }
        } catch (err) {
            console.error('Login failed:', err.response?.data || err.message);
            throw err;
        }
    }, []);

    const checkUserAuth = useCallback(async () => {
        const accessToken = Cookies.get('my-app-auth');
        if (accessToken) {
            try {
                if (shouldRefreshToken()) {
                    await refreshToken();
                }
                const res = await axiosReq.get('/dj-rest-auth/user/');
                setUser(res.data);
            } catch (error) {
                console.error('Failed to authenticate user:', error);
                await logout();
            }
        }
    }, [refreshToken, logout]);

    useEffect(() => {
        checkUserAuth();
    }, [checkUserAuth]);

    useEffect(() => {
        const interceptor = axiosRes.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response?.status === 401) {
                    if (shouldRefreshToken()) {
                        try {
                            const newToken = await refreshToken();
                            error.config.headers[
                                'Authorization'
                            ] = `Bearer ${newToken}`;
                            return axiosReq(error.config);
                        } catch (refreshError) {
                            await logout();
                            return Promise.reject(refreshError);
                        }
                    } else {
                        await logout();
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosRes.interceptors.response.eject(interceptor);
        };
    }, [refreshToken, logout]);

    return (
        <AuthContext.Provider value={{ user, login, logout, checkUserAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
