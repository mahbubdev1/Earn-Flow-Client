import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hook/useAuth";
import useRole from "../hook/useRole";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [role, isLoading] = useRole();

    const location = useLocation();

    if (loading || isLoading) {
        return <h2 className="text-3xl font-bold">Loading...........</h2>
    }

    if (user || role === 'Admin') {
        return children;
    }

    return <Navigate to='/login' state={{ form: location }} replace></Navigate>
};

export default AdminRoute;