import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hook/useAxiosSecure";

const ManageTasks = () => {
    const axiosSecure = useAxiosSecure();
    // Fetching Tasks Data
    const { data: tasks = [], refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tasks`);
            return res.data;
        }
    });

    // Delete Task
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${import.meta.env.VITE_API_URL}/tasks/delete/${id}`)
                    .then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Task has been deleted.",
                            icon: "success"
                        });
                        refetch();
                    });
            }
        });
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-5">Manage Tasks</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr className="text-black text-base">
                            <th>No</th>
                            <th>Title</th>
                            <th>Buyer Name</th>
                            <th>Workers Needed</th>
                            <th>Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, idx) => (
                            <tr key={task._id}>
                                <th>{idx + 1}</th>
                                <td>{task.taskTitle}</td>
                                <td>{task.buyerName}</td>
                                <td>{task.requiredWorkers}</td>
                                <td>${task.payableAmount}</td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(task._id)}
                                        className="btn btn-sm btn-error"
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

export default ManageTasks;