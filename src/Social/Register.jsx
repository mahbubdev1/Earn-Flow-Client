import Lottie from "lottie-react";
import registerImg from "../assets/Lootie/loginLottie.json";
import { toast } from "react-toastify";
import useAuth from "../hook/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleLogin from "./GoogleLogin";
const api_key = import.meta.env.VITE_API_KEY;
const image_api = `https://api.imgbb.com/1/upload?key=${api_key}`

const Register = () => {
    const { handleEmailPassRegister, handleManageUser, refetch } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const pathname = location.state?.form?.pathname || '/';

    const handleSubmit = (e) => {
        e.preventDefault();
        const from = e.target;
        const name = from.name.value;
        const imageFile = from.image.files[0];
        const email = from.email.value;
        const password = from.password.value;
        const role = from.role.value;

        const formData = new FormData();
        formData.append("image", imageFile);

        fetch(image_api, {
            method: "POST",
            body: formData,
        })
            .then(response => response.json())
            .then(imgUploadData => {
                if (imgUploadData.success) {
                    const imageUrl = imgUploadData.data.url;
                    handleEmailPassRegister(email, password)
                        .then(() => {
                            handleManageUser(name, imageUrl)
                                .then(async () => {
                                    const userData = { name, email, imageUrl, role, userCoin: role == 'Worker' ? parseInt(10) : parseInt(50) }
                                    // console.log('user data: ',userData);
                                    await axios.post(`${import.meta.env.VITE_API_URL}/users`, userData)
                                        .then((result) => {
                                            navigate(pathname, { replace: true })
                                            toast.success('Register Success')
                                            refetch();
                                        })
                                });
                        })
                } else {
                    toast.error("Image upload failed!");
                }
            })
            .catch(() => {
                toast.error("Image upload error!");
            });
    };


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 px-5">
                {/* Lottie Animation */}
                <div className="w-full lg:w-1/2">
                    <Lottie animationData={registerImg} loop={true} />
                </div>

                {/* Registration Form */}
                <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
                        Create Your Account
                    </h2>
                    <form onSubmit={handleSubmit}>
                        {/* Name Input */}
                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm font-medium mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Email Input */}
                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm font-medium mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Profile Picture Input */}
                        <div className="mb-4">
                            <input type="file" name="image" id="" />
                        </div>

                        {/* Password Input */}
                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm font-medium mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Role Dropdown */}
                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm font-medium mb-2">
                                Select Role
                            </label>
                            <select
                                name="role"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">Select a role</option>
                                <option value="Worker">Worker</option>
                                <option value="Buyer">Buyer</option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        <div className="mb-4">
                            <input type="submit" value="Register" className="w-full cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-600 transition duration-300" />
                        </div>


                    </form>
                    <div className="mb-4">
                        <GoogleLogin></GoogleLogin>
                    </div>
                    <p>Your Have Already Account? <Link to='/login' className="text-blue-500 font-medium">Please Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
