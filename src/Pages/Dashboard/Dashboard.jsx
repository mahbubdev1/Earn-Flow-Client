import { Link, Outlet } from "react-router-dom";
import useAuth from "../../hook/useAuth";
import { ToastContainer } from "react-toastify";
import DashboardRoute from "./DashboardRoute";
import { MdNotificationAdd } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import 'animate.css';

const Dashboard = () => {
    const { user, coin } = useAuth();
    const { data: notifications = [] } = useQuery({
        queryKey: ['notifications', user?.email],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/notifications/${user?.email}`)
            return res.data
        }
    });
    return (
        <div className="flex flex-col">
            {/* Top Header */}
            <header className="bg-blue-500">
                <div className="container mx-auto text-white px-6 py-4 flex justify-between items-center">
                    <div className="font-bold text-2xl"><Link to='/'>EarnFlow</Link></div>
                    <div className="flex items-center space-x-4">
                        <div className="text-right">
                            <p className="font-bold">{user?.displayName}</p>
                            <p className="text-sm">Coins: {coin}</p>
                        </div>
                        <img
                            src={user?.photoURL}
                            alt="User"
                            className="w-10 h-10 rounded-full border-2 border-white"
                        />
                        <div className={`animate__animated ${notifications.length > 0 ? 'animate__heartBeat animate__infinite animate__slow' : ''}`}>
                            <Link to='/dashboard/notification'>
                                <span className="absolute top-3">
                                    {notifications.length}
                                </span>
                                <MdNotificationAdd size={30} />
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="grid grid-cols-12  container mx-auto">
                {/* Sidebar */}
                <aside className="text-white max-lg:my-3 col-span-2">
                    <div className="text-center py-6 hidden bg-blue-400 min-h-screen  lg:block xl:block z-50">
                        <DashboardRoute></DashboardRoute>
                    </div>

                    <div className="lg:hidden xl:hidden absolute z-50">
                        <div className="drawer">
                            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                            <div className="drawer-content">
                                {/* Page content here */}
                                <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open</label>
                            </div>
                            <div className="drawer-side">
                                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                                    <DashboardRoute></DashboardRoute>
                                </ul>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Section */}
                <main className="flex-1 col-span-10 p-6">

                    <Outlet></Outlet>

                    {/* <h1 className="text-2xl font-bold text-gray-900">
                            Welcome, {user.name}!
                        </h1> */}
                    {/* <p className="text-gray-600 mt-2">
                            Here is your dashboard based on your role:{" "}
                            <span className="font-bold">{user.role}</span>.
                        </p> */}

                    {/* Example Content */}
                    {/* <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="bg-white p-4 border border-gray-200 rounded shadow">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Total Tasks
                                </h3>
                                <p className="text-blue-500 text-3xl font-bold">34</p>
                            </div>
                            <div className="bg-white p-4 border border-gray-200 rounded shadow">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Completed Tasks
                                </h3>
                                <p className="text-blue-500 text-3xl font-bold">28</p>
                            </div>
                            <div className="bg-white p-4 border border-gray-200 rounded shadow">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Coins Earned
                                </h3>
                                <p className="text-blue-500 text-3xl font-bold">500</p>
                            </div>
                        </div> */}
                </main>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Dashboard;
