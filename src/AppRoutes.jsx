import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import LoginForm from './pages/auth/LoginForm';
import TracksPage from './pages/tracks/tracksPage';
import SignupForm from './pages/auth/SignUpForm';

function AppRoutes() {
    const { user } = useAuth(); // Get user state from AuthContext

    return (
        <Routes>
            <Route
                path='/tracks'
                element={<TracksPage />}
            />
            <Route
                path='/login'
                element={user ? <Navigate to='/tracks' /> : <LoginForm />}
            />
            <Route
                path='/signup'
                element={<SignupForm />}
            />
        </Routes>
    );
}

export default AppRoutes;
