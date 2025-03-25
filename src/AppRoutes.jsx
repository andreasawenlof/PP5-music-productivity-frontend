import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import LoginForm from './pages/auth/LoginForm';
import TracksPage from './pages/tracks/TracksPage';
import SignupForm from './pages/auth/SignUpForm';
import TrackDetails from './pages/tracks/TrackDetails';
import CreateTrack from './pages/tracks/CreateTrack';
import EditTrack from './pages/tracks/EditTrack';
import ProfilePage from './pages/profiles/ProfilePage';
import NotFound from './components/NotFound';
import WelcomePage from './pages/WelcomePage';

function AppRoutes() {
    const { user } = useAuth(); // Get user state from AuthContext

    return (
        <Routes>
            <Route
                path='/'
                element={<WelcomePage />}
            />
            <Route
                path='/tracks'
                element={<TracksPage />}
            />
            <Route
                path='/tracks/:id'
                element={<TrackDetails />}
            />
            <Route
                path='/tracks/create'
                element={<CreateTrack />}
            />
            <Route
                path='/tracks/:id/edit'
                element={<EditTrack />}
            />
            <Route
                path='/login'
                element={user ? <Navigate to='/tracks' /> : <LoginForm />}
            />
            <Route
                path='/signup'
                element={<SignupForm />}
            />
            <Route
                path='/profiles/:id'
                element={<ProfilePage />}
            />
            <Route
                path='*'
                element={<NotFound />}
            />
        </Routes>
    );
}

export default AppRoutes;
