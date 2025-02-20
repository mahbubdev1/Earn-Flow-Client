import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: 'https://earn-flow-server.vercel.app',
    withCredentials: true
    // baseURL: 'http://localhost:5000',
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { handleSignOut } = useAuth();

    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        config.headers.authorization = (`Bearer ${token}`)
        return config
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    axiosSecure.interceptors.response.use(function (response) {
        return response
    }, async(error) => {
        const status = error.response.status;
        if (status === 401 || status === 403) {
            await handleSignOut();
            navigate('/login')
        };
        return Promise.reject(error);
    })

    return axiosSecure
};

export default useAxiosSecure;