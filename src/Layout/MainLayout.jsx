import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <ToastContainer />
        </div>
    );
};

export default MainLayout;