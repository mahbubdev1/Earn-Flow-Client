import { Link, Outlet } from "react-router-dom";
import useAuth from "../../hook/useAuth";
import { ToastContainer } from "react-toastify";
import DashboardRoute from "./DashboardRoute";
import { MdNotificationAdd } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import useRole from "../../hook/useRole";
import 'animate.css';

const Dashboard = () => {
    const { user, coin } = useAuth();
    const [role] = useRole();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNotifications, setSelectedNotifications] = useState([]);

    // Fetch notifications for worker
    const { data: notifications = [] } = useQuery({
        queryKey: ['notifications', user?.email],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/notifications/${user?.email}`);
            return res.data;
        }
    });

    // Fetch notifications for buyer
    const { data: notificationsBuyer = [] } = useQuery({
        queryKey: ['notificationBuyers'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/notification/buyers`);
            return res.data;
        }
    });

    // Open Modal and Set Notifications based on role
    const handleNotificationClick = () => {
        if (role == "Worker") {
            setSelectedNotifications(notifications);
        } else if (role == "Buyer") {
            setSelectedNotifications(notificationsBuyer);
        }
        setIsModalOpen(true);
    };


    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

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
                        <div
                            className={`animate__animated cursor-pointer ${notifications.length > 0 || notificationsBuyer.length > 0
                                ? 'animate__heartBeat animate__infinite animate__slow'
                                : ''
                                }`}
                            onClick={handleNotificationClick}
                        >
                            <span className="absolute top-3 bg-blue-500 p-[2px] rounded-lg font-bold">
                                {role === "Worker" ? notifications.length : notificationsBuyer.length}
                            </span>
                            <MdNotificationAdd size={30} />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="grid grid-cols-12 container mx-auto">
                <aside className="text-white max-lg:my-3 col-span-2">
                    <div className="text-center py-6 hidden bg-blue-400 min-h-screen lg:block xl:block z-50">
                        <DashboardRoute></DashboardRoute>
                    </div>

                    <div className="lg:hidden xl:hidden absolute z-50">
                        <div className="drawer">
                            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                            <div className="drawer-content">
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
                </main>
            </div>

            {/* Notification Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                        <h3 className="text-lg font-bold mb-4">
                            {role === "Worker" ? "Worker Notifications" : "Buyer Notifications"}
                        </h3>
                        {selectedNotifications.length === 0 ? (
                            <p className="text-gray-500">No notifications available.</p>
                        ) : (
                            <ul className="space-y-3">
                                {selectedNotifications.map(notification => (
                                    <li key={notification._id} className="p-4 border border-gray-200 rounded-md">
                                        <p className="text-sm">{notification.message}</p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(notification.time || notification.date).toLocaleString()}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <button
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            onClick={handleCloseModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Dashboard;