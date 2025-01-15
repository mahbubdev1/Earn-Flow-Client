import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Fetch task details
    const { data = {}, isLoading, error, refetch } = useQuery({
        queryKey: ['tasks', id],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/tasks/${id}`);
            return data;
        }
    });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading task data.</p>;
    }

    const handleUpdateBtn = async (e) => {
        e.preventDefault();
        const form = e.target;
        const taskTitle = form.taskTitle.value;
        const taskDetail = form.taskDetail.value;
        const submissionInfo = form.submissionInfo.value;

        const updatedTask = {
            taskTitle,
            taskDetail,
            submissionInfo,
        };

        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/task/${id}`, updatedTask);
            refetch();
            toast.success("Task updated successfully!");
            navigate('/dashboard/myTask')
        } catch (err) {
            toast.error("Failed to update task.", err.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleUpdateBtn}>
                {/* Task Title */}
                <div className="form-control">
                    <label className="label font-semibold">Task Title</label>
                    <input
                        type="text"
                        name="taskTitle"
                        defaultValue={data.taskTitle}
                        placeholder="Enter Your Title"
                        className="input input-bordered w-full"
                    />
                </div>
                {/* Task Details */}
                <div className="form-control">
                    <label className="label font-semibold">Task Details</label>
                    <input
                        type="text"
                        name="taskDetail"
                        defaultValue={data.taskDetail}
                        placeholder="Enter Your Details"
                        className="input input-bordered w-full"
                    />
                </div>
                {/* Submission Info */}
                <div className="form-control">
                    <label className="label font-semibold">Submission Details</label>
                    <input
                        type="text"
                        name="submissionInfo"
                        defaultValue={data.submissionInfo}
                        placeholder="Enter Your Submission Details"
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Submit Button */}
                <input
                    value="Update Task"
                    type="submit"
                    className="btn btn-primary w-full mt-4"
                />
            </form>
        </div>
    );
};

export default UpdateTask;