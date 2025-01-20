import { NavLink } from "react-router-dom";
import useRole from "../../hook/useRole";
import { FaHome } from "react-icons/fa";
import { MdAddTask, MdOutlineTask } from "react-icons/md";
import { RiHistoryLine } from "react-icons/ri";
import { ImCoinDollar } from "react-icons/im";

const DashboardRoute = () => {
    const [role] = useRole();
    return (
        <div className="mt-6">
            {
                role === 'Buyer' && <>
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
                </>
            }


            {
                role === 'Worker' && <>
                    <NavLink
                        to="/dashboard/workerHome"
                        className={({ isActive }) =>
                            `flex items-center justify-center px-5 py-2 gap-2 text-lg font-medium mx-auto ${isActive ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'
                            }`
                        }
                    >
                        <RiHistoryLine />Worker Home
                    </NavLink>

                    <NavLink
                        to="/dashboard/taskList"
                        className={({ isActive }) =>
                            `flex items-center justify-center my-3 px-5 py-2 gap-2 text-lg font-medium mx-auto ${isActive ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'
                            }`
                        }
                    >
                        <RiHistoryLine />Task List
                    </NavLink>
                    <NavLink
                        to="/dashboard/mySubmission"
                        className={({ isActive }) =>
                            `flex items-center justify-center px-5 py-2 gap-2 text-lg font-medium mx-auto ${isActive ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'
                            }`
                        }
                    >
                        <RiHistoryLine />My Submission
                    </NavLink>
                    <NavLink
                        to="/dashboard/withDrawals"
                        className={({ isActive }) =>
                            `flex items-center justify-center mt-3 px-5 py-2 gap-2 text-lg font-medium mx-auto ${isActive ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'
                            }`
                        }
                    >
                        <RiHistoryLine />WithDrawals
                    </NavLink>
                </>
            }

            {
                role === 'Admin' && <>
                    <NavLink
                        to="/dashboard/adminHome"
                        className={({ isActive }) =>
                            `flex items-center justify-center px-5 py-2 gap-2 text-lg font-medium mx-auto ${isActive ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'
                            }`
                        }
                    >
                        <RiHistoryLine />Admin Home
                    </NavLink>
                    <NavLink
                        to="/dashboard/manageUsers"
                        className={({ isActive }) =>
                            `flex items-center justify-center px-5 py-2 my-3 gap-2 text-lg font-medium mx-auto ${isActive ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'
                            }`
                        }
                    >
                        <RiHistoryLine />Manage Users
                    </NavLink>
                    <NavLink
                        to="/dashboard/manageTasks"
                        className={({ isActive }) =>
                            `flex items-center justify-center px-5 py-2 gap-2 text-lg font-medium mx-auto ${isActive ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'
                            }`
                        }
                    >
                        <RiHistoryLine />Manage Tasks
                    </NavLink>
                </>
            }

        </div>
    );
};

export default DashboardRoute;