import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const useAuthRedirect = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user) {
            // ✅ Logged in: NEVER allow /login or /signup
            if (['/login', '/signup'].includes(location.pathname)) {
                navigate('/tracks', { replace: true });
            }
        } else {
            // ✅ Logged out: Protect everything except '/', '/login', '/signup'
            const allowedPaths = ['/', '/login', '/signup'];
            if (!allowedPaths.includes(location.pathname)) {
                navigate('/login', { state: { from: location.pathname } });
            }
        }
        setIsLoading(false);
    }, [user, navigate, location]);

    return isLoading;
};

export default useAuthRedirect;
