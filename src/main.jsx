import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { MessageProvider } from './contexts/MessageContext';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <MessageProvider>
                    <App />
                </MessageProvider>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
);
