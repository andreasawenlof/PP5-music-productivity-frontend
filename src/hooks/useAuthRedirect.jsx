import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Custom hook to handle authentication-based redirects.
 * - Redirects users **away** from login if already logged in.
 * - Redirects **back to the last attempted page** after login.
 */
const useAuthRedirect = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user) {
            // ✅ If user is logged in & came from a protected page → Redirect back
            const from = location.state?.from || '/';
            if (location.pathname === '/login') {
                navigate(from, { replace: true });
            }
            setIsLoading(false);
        } else {
            // ✅ If NOT logged in & accessing a protected page → Redirect to login & save page
            if (location.pathname !== '/login') {
                navigate('/login', { state: { from: location.pathname } });
            }
            setIsLoading(false);
        }
    }, [user, navigate, location]);

    return isLoading; // ✅ Components can delay rendering until check completes
};

export default useAuthRedirect;
