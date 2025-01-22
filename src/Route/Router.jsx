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
import UpdateTask from "../Pages/BuyerDashboard/UpdateTask";
import Payment from "../Pages/BuyerDashboard/PaymentInfo/Payment";
import PurchaseCoin from "../Pages/BuyerDashboard/PurchaseCoin";
import PaymentHistory from "../Pages/BuyerDashboard/PaymentInfo/PaymentHistory";
import WorkerHome from "../Pages/WorkerDashboard/WorkerHome";
import TaskList from "../Pages/WorkerDashboard/TaskList";
import MySubmission from "../Pages/WorkerDashboard/MySubmission";
import WithDrawals from "../Pages/WorkerDashboard/WithDrawals";
import AdminHome from "../Pages/AdminDashboard/AdminHome";
import ManageUsers from "../Pages/AdminDashboard/ManageUsers";
import ManageTasks from "../Pages/AdminDashboard/ManageTasks";
import TaskDetails from "../Pages/WorkerDashboard/TaskDetails";
import Notification from "../Pages/Dashboard/Notification";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import Error from "../Components/ErrorLoading/Error";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement:<Error></Error> ,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute> <Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: 'notification',
                element: <Notification></Notification>
            },
            // Buyer Router
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
            },
            {
                path: 'updateTask/:id',
                element: <UpdateTask></UpdateTask>
            },
            {
                path: 'purchaseCoin',
                element: <PurchaseCoin></PurchaseCoin>
            },
            {
                path: 'pay/:amount',
                element: <Payment></Payment>
            },
            {
                path: 'paymentHistory',
                element: <PaymentHistory></PaymentHistory>
            },
            // Worker Route
            {
                path: 'workerHome',
                element: <WorkerHome></WorkerHome>
            },
            {
                path: 'taskList',
                element: <TaskList></TaskList>
            },
            {
                path: 'taskDetails/:id',
                element: <TaskDetails></TaskDetails>
            },
            {
                path: 'mySubmission',
                element: <MySubmission></MySubmission>
            },
            {
                path: 'withDrawals',
                element: <WithDrawals></WithDrawals>
            },
            // Admin Related Route
            {
                path: 'adminHome',
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
            },
            {
                path: 'manageUsers',
                element: <ManageUsers></ManageUsers>
            },
            {
                path: 'manageTasks',
                element: <ManageTasks></ManageTasks>
            }
        ]
    }
]);

export default router