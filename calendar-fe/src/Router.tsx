import {createBrowserRouter} from "react-router-dom";
import {App} from "antd";
import DefaultLayout from "./layouts/DefaultLayout";
import CalendarHome from "./pages/Calendar/CalendarHome";
import TaskList from "./pages/TaskList/TaskList";
import Login from "./pages/Auth/Login/Login";

const router = createBrowserRouter([
    {
        path:"/",
        element:<DefaultLayout/>,
        children:[
            {
                path:"/",
                element:<CalendarHome/>
            },
            {
                path:"/taskList",
                element:<TaskList/>
            }
        ]
    },
    {
        path:"/login",
        element:<Login/>
    }
])

export default router;
    