import { Link, NavLink, Outlet } from "react-router-dom";
import useAuth from "../../hook/useAuth";
import { FaHome } from "react-icons/fa";
import { MdAddTask, MdOutlineTask } from "react-icons/md";
import { ImCoinDollar } from "react-icons/im";
import { RiHistoryLine } from "react-icons/ri";
import { ToastContainer } from "react-toastify";

const Dashboard = () => {
    const { user, coin } = useAuth();

    return (
        <div className="">
            <div className="min-h-screen flex flex-col">
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
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <div className="flex flex-1 container mx-auto">
                    {/* Sidebar */}
                    <aside className="w-64 bg-blue-400 text-white">
                        <div className="text-center py-6">
                            <h2 className="font-bold text-xl">Navigation</h2>
                            <div className="mt-6">
                                <NavLink
                                    to="/dashboard/buyerHome"
                                    className={({ isActive }) =>
                                        `flex items-center justify-center px-5 py-2 gap-2 text-lg font-medium mx-auto ${isActive ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'
                                        }`
                                    }
                                >
                                    <FaHome></FaHome>Buyer Home
                                </NavLink>

                                <NavLink
                                    to="/dashboard/addTask"
                                    className={({ isActive }) =>
                                        `flex items-center justify-center my-3 px-5 py-2 gap-2 text-lg font-medium mx-auto ${isActive ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'
                                        }`
                                    }
                                >
                                    <MdAddTask />Add new Tasks
                                </NavLink>

                                <NavLink
                                    to="/dashboard/myTask"
                                    className={({ isActive }) =>
                                        `flex items-center justify-center px-5 py-2 gap-2 text-lg font-medium mx-auto ${isActive ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'
                                        }`
                                    }
                                >
                                    <MdOutlineTask />My Task’s
                                </NavLink>

                                <NavLink
                                    to="/dashboard/purchaseCoin"
                                    className={({ isActive }) =>
                                        `flex items-center justify-center my-3 px-5 py-2 gap-2 text-lg font-medium mx-auto ${isActive ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'
                                        }`
                                    }
                                >
                                   <ImCoinDollar />Purchase Coin
                                </NavLink>

                                <NavLink
                                    to="/dashboard/paymentHistory"
                                    className={({ isActive }) =>
                                        `flex items-center justify-center px-5 py-2 gap-2 text-lg font-medium mx-auto ${isActive ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'
                                        }`
                                    }
                                >
                                    <RiHistoryLine />Payment History
                                </NavLink>
                            </div>
                        </div>


                    </aside>

                    {/* Main Section */}
                    <main className="flex-1  p-6">

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
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Dashboard;
