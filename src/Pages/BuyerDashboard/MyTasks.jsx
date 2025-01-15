import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hook/useAuth";
import axios from "axios";


const MyTasks = () => {
    const { user } = useAuth();

    const { data = []} = useQuery({
        queryKey: ['tasks', user?.email],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/tasks/${user?.email}`)
            return data
        }
    });

    console.log(data);

    return (
        <div>

        </div>
    );
};

export default MyTasks;