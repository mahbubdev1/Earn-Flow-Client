import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hook/useAuth";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <h2 className="text-3xl font-bold">Loading...........</h2>
    }

    if (user) {
        return children;
    }

    return <Navigate to='/login' state={{ form: location }} replace></Navigate>
};

export default PrivateRoute;