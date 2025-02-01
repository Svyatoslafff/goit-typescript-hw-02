import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import 'modern-normalize';
import { Toaster } from 'react-hot-toast';
import App from './components/App/App';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
        <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
    </StrictMode>
);
