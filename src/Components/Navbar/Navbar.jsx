import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hook/useAuth";
import { toast } from "react-toastify";
import useRole from "../../hook/useRole";

const Navbar = () => {
    const { handleSignOut, user, coin } = useAuth();
    const [role] = useRole();


    let routerHome = '';
    if (role === 'Admin') {
        routerHome = '/dashboard/adminHome';
    }
    else if (role === 'Buyer') {
        routerHome = '/dashboard/buyerHome'
    }
    else {
        routerHome = '/dashboard/workerHome'
    }


    const handleSignOutBtn = async () => {
        await handleSignOut()
            .then(() => {
                toast.success('Logout Success')
            })
    }
    return (
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg">
            <div className="navbar container mx-auto text-white">
                {/* Logo Section */}
                <div className="flex-1">
                    <Link className="text-2xl font-bold tracking-wide hover:text-cyan-300">
                        FlowEarn
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="hidden lg:flex space-x-6">
                    <NavLink
                        to="https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-mahbubdev1"
                        className={({ isActive }) =>
                            isActive
                                ? "text-cyan-300 font-semibold"
                                : "hover:text-cyan-300 transition duration-300"
                        }
                    >
                        Join Us
                    </NavLink>
                    {
                        user && <>
                            <NavLink
                                to={routerHome}
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-cyan-300 font-semibold"
                                        : "hover:text-cyan-300 transition duration-300"
                                }
                            >
                                Dashboard
                            </NavLink>
                            <NavLink
                                to="/availableCoin"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-cyan-300 font-semibold"
                                        : "hover:text-cyan-300 transition duration-300"
                                }
                            >
                                Available Coin ${coin}
                            </NavLink>
                        </>
                    }
                </div>

                {/* Buttons Section */}
                <div className="flex-none space-x-3 ml-4">
                    {
                        user ? <button onClick={handleSignOutBtn} className="px-4 py-[6px] rounded-lg bg-white text-blue-500 font-medium hover:bg-cyan-600 hover:text-white transition duration-300">Sign Out</button> : <>
                            <Link to='/login'>
                                <button className="px-4 py-2 rounded-lg bg-white text-blue-500 font-medium hover:bg-cyan-600 hover:text-white transition duration-300">
                                    Login
                                </button>
                            </Link>
                            <Link to="register">
                                <button className="px-4 py-2 rounded-lg border border-white text-white font-medium hover:bg-white hover:text-blue-500 transition duration-300">
                                    Register
                                </button>
                            </Link>
                        </>
                    }
                </div>

                {/* User Profile Dropdown */}
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full">
                            <img
                                alt="User Avatar"
                                src={`${user ? user.photoURL : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}`}
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-white text-gray-700 rounded-box shadow-lg mt-3 w-52"
                    >
                        <li>
                            <Link className="justify-between hover:bg-cyan-100">
                                {user?.displayName}
                                <span className="badge bg-cyan-500 text-white">New</span>
                            </Link>
                        </li>
                        <li><Link className="hover:bg-cyan-100">Settings</Link></li>
                        <li><Link className="hover:bg-cyan-100">Logout</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
