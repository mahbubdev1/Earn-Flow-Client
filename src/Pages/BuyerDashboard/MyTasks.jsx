import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hook/useAuth";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hook/useAxiosSecure";
import Loading from "../../Components/ErrorLoading/Loading";

const MyTasks = () => {
    const { user, refetch } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetch tasks data
    const { data: tasks = [], refetch: taskRefetch, isLoading } = useQuery({
        queryKey: ['tasks', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/tasks/user/${user?.email}`);
            return data;
        }
    });

    // Handle Delete Task
    const handleDelete = async (taskId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${taskId}?email=${user?.email}`)
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    taskRefetch();
                    refetch();
                }
            }
        });
    };

    if(isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className="w-full mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6">My Tasks</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Title</th>
                            <th>Detail</th>
                            <th>Payable</th>
                            <th>Completion Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, index) => (
                            <tr key={task._id}>
                                <td>{index + 1}</td>
                                <td>{task.taskTitle}</td>
                                <td>{task.taskDetail}</td>
                                <td>${task.requiredWorkers}</td>
                                <td>{new Date(task.completionDate).toLocaleDateString()}</td>
                                <td className="sm:flex max-sm:space-y-1">
                                    <Link to={`/dashboard/updateTask/${task._id}`}>
                                        <button className="btn btn-sm btn-warning mr-2">
                                            Update
                                        </button>
                                    </Link>
                                    <button
                                        className="btn btn-sm btn-error"
                                        onClick={() => handleDelete(task._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default MyTasks;