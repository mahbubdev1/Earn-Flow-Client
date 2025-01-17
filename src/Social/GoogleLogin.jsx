import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../hook/useAuth";
import { FaGoogle } from "react-icons/fa";
import axios from "axios";

const GoogleLogin = () => {
    const { googleSingUp, refetch } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const pathname = location.state?.form?.pathname || '/';

    const handleGoogleLoginBtn = () => {
        googleSingUp()
            .then((result) => {

                // console.log(result.user);
                const userData = { name: result.user.displayName, email: result.user.email, imageUrl: result.user.photoURL, role: 'Worker', userCoin: parseInt(10) }
                axios.post(`${import.meta.env.VITE_API_URL}/users/${result.user.email}`, userData)
                    .then((result) => {
                        navigate(pathname, { replace: true })
                        toast.success('Register Success')
                        // console.log(result.user);
                        refetch();
                    })
            });
    }
    return (
        <div>
            <button onClick={handleGoogleLoginBtn} className="w-full flex justify-center items-center text-blue-500 font-medium hover:bg-blue-500 hover:text-white py-2 px-4 rounded-lg border border-cyan-600 transition duration-300"><span><FaGoogle /></span> <span className="ml-2">Google Login</span></button>
        </div>
    );
};

export default GoogleLogin;