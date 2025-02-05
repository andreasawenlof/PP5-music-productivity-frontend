import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Custom hook to handle authentication-based redirects.
 * - Redirects users **away** from login if already logged in.
 * - Prevents flickering of login form.
 * - Returns `isLoading` so components can delay rendering.
 */
const useAuthRedirect = (protectedPath = null) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user) {
            if (location.pathname === '/login') {
                console.log('🔄 User is logged in, redirecting to home...');
                navigate('/'); // Redirect logged-in users away from login page
            }
            setIsLoading(false);
        } else {
            if (protectedPath) {
                console.log('🚫 No user found, redirecting to login...');
                navigate('/login'); // Redirect unauthorized users to login
            }
            setIsLoading(false);
        }
    }, [user, navigate, location, protectedPath]);

    return isLoading; // Components can use this to delay rendering
};

export default useAuthRedirect;
