import React from 'react';
import {NavLink} from "react-router-dom";

const rightLink = [
    {
        title: "Login",
        path: "/login"
    },
    {
        title: "Register",
        path: "/register"
    }
]

const NavigationBar = () => {
    return (
        <div className="relative">
            <div className="absolute end-0">
                {rightLink.map((e) => {
                    return (
                        <NavLink to={e.path} key={e.path}>
                            {e.title.toLowerCase()}
                        </NavLink>
                    )
                })}
            </div>
        </div>
    );
};

export default NavigationBar;