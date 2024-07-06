import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
    const token = localStorage.getItem('token'); // Check for token or authentication status
    return !!token;
};

const PublicRoute = () => {
    const isAuth = useAuth();
    return isAuth ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
