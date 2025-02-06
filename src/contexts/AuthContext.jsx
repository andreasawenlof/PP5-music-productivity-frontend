import { createContext, useContext, useEffect, useState } from 'react';
import { axiosReq } from '../api/axiosDefaults';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const navigate = useNavigate();

    // 🔄 Check User on Page Load
    useEffect(() => {
        const accessToken = Cookies.get('my-app-auth');

        if (accessToken) {
            axiosReq
                .get('/dj-rest-auth/user/', {
                    headers: { Authorization: `Bearer ${accessToken}` },
                })
                .then((res) => {
                    setUser(res.data);
                    localStorage.setItem('user', JSON.stringify(res.data)); // Persist user
                })
                .catch(() => logout()); // Auto logout if invalid
        }
    }, []);

    // 🔓 Login function
    const login = async (credentials) => {
        try {
            const res = await axiosReq.post(
                '/dj-rest-auth/login/',
                credentials
            );

            Cookies.set('my-app-auth', res.data.access, { expires: 1 });
            Cookies.set('my-refresh-token', res.data.refresh, { expires: 7 });

            setUser(res.data.user);
            localStorage.setItem('user', JSON.stringify(res.data.user));
        } catch (err) {
            console.error('❌ Login failed:', err);
        }
    };

    // 🚪 Logout function
    const logout = async () => {
        try {
            await axiosReq.post('/dj-rest-auth/logout/');
            Cookies.remove('my-app-auth');
            Cookies.remove('my-refresh-token');
            setUser(null);
            localStorage.removeItem('user'); // Remove user from localStorage
            navigate('/login');
        } catch (err) {
            console.error('❌ Logout error:', err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
