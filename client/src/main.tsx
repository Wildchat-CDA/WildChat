import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthentificationContext';
import { UserProvider } from './context/UserContext';
import ProtectedRoute from './components/ProtectedRoutes';
import App from './App';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CGU from './pages/CGU';
import Politics from './pages/Politics';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cgu" element={<CGU />} />
            <Route path="/politics" element={<Politics />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/*" element={<App />} />
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);