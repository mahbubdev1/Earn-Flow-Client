import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Components/Home/Home";
import Login from "../Social/Login";
import Register from "../Social/Register";
import Dashboard from "../Pages/Dashboard/Dashboard";
import BuyerHome from "../Pages/BuyerDashboard/BuyerHome";
import AddNewTask from "../Pages/BuyerDashboard/AddNewTask";
import MyTasks from "../Pages/BuyerDashboard/MyTasks";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path:'/login',
                element: <Login></Login>
            },
            {
                path:'/register',
                element: <Register></Register>
            }
        ]
    },
    {
        path:'/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: 'buyerHome',
                element: <BuyerHome></BuyerHome>
            },
            {
                path: 'addTask',
                element: <AddNewTask></AddNewTask>
            },
            {
                path: 'myTask',
                element: <MyTasks></MyTasks>
            }
        ]
    }
]);

export default router