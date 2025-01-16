import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
    const navigate = useNavigate();
    const { data: tasks } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`);
            return res.data
        }
    });

    return (
        <div>
            <h1 className="text-3xl font-bold text-center my-6 text-blue-600">Available Tasks</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {tasks?.map((task) => (
                    <div key={task._id} className="bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300">
                        <img 
                            className="w-full h-48 rounded-t-lg object-cover" 
                            src={task.taskImageUrl} 
                            alt="Task" 
                        />
                        <div className="p-4">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">{task.taskTitle}</h2>
                            <p className="text-sm text-gray-600">Buyer: <span className="font-medium">{task.buyerName}</span></p>
                            <p className="text-sm text-gray-600">Completion Date: <span className="font-medium">{new Date(task.completionDate).toLocaleDateString()}</span></p>
                            <p className="text-sm text-gray-600">Payable Amount: <span className="font-medium text-green-600">${task.payableAmount}</span></p>
                            <p className="text-sm text-gray-600">Required Workers: <span className="font-medium">{task.requiredWorkers}</span></p>
                            <button
                                className="w-full mt-4 py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-300"
                                onClick={() => navigate(`/taskDetails/${task._id}`)}
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskList;