import Lottie from "lottie-react";
import LottieImg from "../assets/Lootie/loginLottie.json";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
import { toast } from "react-toastify";
// import { FaGoogle } from "react-icons/fa";
import GoogleLogin from "./GoogleLogin";

const Login = () => {
    const { handleSignEmailPassword, googleSingUp } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const pathname = location.state?.form?.pathname || '/';

    const handleSubmit = (e) => {
        e.preventDefault();
        const from = e.target;
        const email = from.email.value;
        const password = from.password.value;
        handleSignEmailPassword(email, password)
            .then(() => {
                toast.success('Login Success')
                navigate(pathname, { replace: true })
            })
            .catch((err) => {
                toast.error(err.message)
            })
    }
    
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 px-5">
                {/* Lottie Animation */}
                <div className="w-full lg:w-1/2">
                    <Lottie animationData={LottieImg} loop={true} />
                </div>

                {/* Login Form */}
                <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Welcome Back!</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Email Input */}
                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm font-medium mb-2">
                                Email Address
                            </label>
                            <input
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm font-medium mb-2">
                                Password
                            </label>
                            <input
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                required
                            />
                        </div>

                        {/* Login Button */}
                        <div className="mb-4">
                            <input type="submit" value="Login" className="w-full cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-600 transition duration-300" />
                        </div>

                        <div className="mb-4">
                            <GoogleLogin></GoogleLogin>
                        </div>

                        {/* Forgot Password */}
                        <div className="text-center">
                            <Link className="text-sm text-cyan-600 hover:underline">
                                Forgot your password?
                            </Link>
                        </div>

                        {/* Register Redirect */}
                        <div className="text-center mt-4">
                            <p className="text-sm text-gray-600">
                                Dont have an account?{" "}
                                <Link to='/register' className="text-cyan-600 font-medium hover:underline">
                                    Register here
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
