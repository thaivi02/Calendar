import {createBrowserRouter} from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import PrivateRoute from "./PrivateRoute";
import React from "react";
import CalendarHome from "../pages/Calendar/CalendarHome";
import {Login} from "../pages/Auth/Login";
import {Register} from "../pages/Auth/Register";
import PublicRoute from "./PublicRoute";
import {TaskList} from "../pages/Task";


const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <PrivateRoute />, // Protect private routes
                children: [
                    {
                        path: '/',
                        element: <CalendarHome />,
                    },
                    {
                        path: 'taskList',
                        element: <TaskList />,
                    },
                ],
            },
        ],
    },
    {
        path: '/auth',
        element: <PublicRoute />, // Protect public routes
        children: [
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'register',
                element: <Register />,
            },
        ],
    },
]);
export default router;
    