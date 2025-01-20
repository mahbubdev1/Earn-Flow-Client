import axios from "axios";
import useAuth from "../../hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import useRole from "../../hook/useRole";

const Notification = () => {
    const { user } = useAuth();
    const [role] = useRole();

    const { data: notifications = [] } = useQuery({
        queryKey: ['notifications', user?.email],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/notifications/${user?.email}`);
            return res.data;
        }
    });

    const { data: notificationsBuyer = [] } = useQuery({
        queryKey: ['notificationBuyers'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/notification/buyers`);
            return res.data;
        }
    });

    console.log(notificationsBuyer);



    return (
        <div className="p-4">
            <div>
                {
                    role == 'Worker' && <>
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
                        )};
                    </>
                }
            </div>
            <div>
                {
                    role == 'Buyer' && <>
                        <h2 className="text-2xl font-bold mb-4">Your Notifications</h2>
                    </>
                }
            </div>
        </div>
    );
};

export default Notification;