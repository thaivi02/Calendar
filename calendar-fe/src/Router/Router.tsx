import {createBrowserRouter} from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import PrivateRoute from "./PrivateRoute";
import React from "react";
import CalendarHome from "../pages/Calendar/CalendarHome";
import TaskList from "../pages/TaskList/TaskList";
import {Login} from "../pages/Auth/Login";
import {Register} from "../pages/Auth/Register";


const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <PrivateRoute />,
                children: [
                    {
                        path: "/",
                        element: <CalendarHome />,
                    },
                    {
                        path: "/taskList",
                        element: <TaskList />,
                    },
                ],
            },
        ],
    },
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/register",
        element: <Register/>,
    }
]);
export default router;
    