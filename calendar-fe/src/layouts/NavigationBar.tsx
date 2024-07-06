import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";


const NavigationBar = () => {
    
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear()
    }
    return (
        <div className="relative">
            <div className="absolute top-0 end-0">
                <NavLink
                    to="/auth/login"
                    className="p-2 ml-2 text-lg rounded hover:bg-gray-200 font-semibold text-gray-700"
                    onClick={handleLogout}
                >
                    Logout
                </NavLink>
            </div>
        </div>
    );
};

export default NavigationBar;