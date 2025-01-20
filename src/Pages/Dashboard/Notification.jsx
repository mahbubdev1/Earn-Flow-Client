import axios from "axios";
import useAuth from "../../hook/useAuth";
import { useQuery } from "@tanstack/react-query";

const Notification = () => {
    const { user } = useAuth();

    const { data: notifications = [] } = useQuery({
        queryKey: ['notifications', user?.email],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/notifications/${user?.email}`);
            return res.data;
        }
    });

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Notifications</h2>
            {notifications.length === 0 ? (
                <p>No notifications found.</p>
            ) : (
                <ul className="space-y-3">
                    {notifications.map(notification => (
                        <li key={notification._id} className="bg-white shadow-md p-4 rounded-md">
                            <p>{notification.message}</p>
                            <p className="text-gray-500 text-sm">{new Date(notification.time).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Notification;