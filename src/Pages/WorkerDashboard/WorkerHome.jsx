import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hook/useAuth";
import axios from "axios";

const WorkerHome = () => {
    const { user } = useAuth();

    const { data: completeTask = [] } = useQuery({
        queryKey: ['tasks', user?.email],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/tasks/complete/${user?.email}`)
            return res.data
        }
    });
    // console.log(completeTask);
    return (
        <div className="overflow-x-auto ">
            <table className="table table-base table-pin-rows table-pin-cols">
                <thead>
                    <tr className="text-black">
                        <th>No</th>
                        <td>Task Title</td>
                        <td>Payable Amount</td>
                        <td>Buyer Name</td>
                        <td>Status</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        completeTask?.map((complete, index) => <tr key={complete._id}>
                            <th>{index + 1}</th>
                            <td>{complete.task_title}</td>
                            <td>{complete.payable_amount}</td>
                            <td>{complete.buyer_name}</td>
                            <td>
                                <span className="px-3 py-1 rounded-full text-white bg-green-500 font-semibold">
                                    {complete.status.toUpperCase()}
                                </span>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default WorkerHome;