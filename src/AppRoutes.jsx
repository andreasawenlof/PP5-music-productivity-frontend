import { Route, Routes } from 'react-router-dom';
import LoginForm from './pages/auth/LoginForm';
import TracksPage from './pages/tracks/tracksPage';

function AppRoutes() {
    return (
        <Routes>
            <Route
                path='/tracks'
                element={<TracksPage />}
            />
            <Route
                path='/login'
                element={<LoginForm />}
            />
        </Routes>
    );
}

export default AppRoutes;
