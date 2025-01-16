import axios from "axios";
import { toast } from "react-toastify";
import useAuth from "../../hook/useAuth";
import { useNavigate } from "react-router-dom";

const api_key = import.meta.env.VITE_API_KEY;
const image_api = `https://api.imgbb.com/1/upload?key=${api_key}`;

const AddNewTask = () => {
    const { user, coin, setCoin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        // Collecting form data
        const taskTitle = form.taskTitle.value;
        const taskDetail = form.taskDetail.value;
        const worker = parseInt(form.worker.value);
        const payableAmount = parseFloat(form.payableAmount.value);
        const completionDate = form.completionDate.value;
        const submissionInfo = form.submissionInfo.value;
        const imageFile = form.taskImageUrl.files[0];

        // Validating Image
        if (!imageFile) {
            toast.error("Please upload an image!");
            return;
        };

        const totalAmount = worker * payableAmount;

        if (coin < totalAmount) {
            navigate('/dashboard/purchaseCoin')
            return toast.error('Not enough balance')
        }

        try {
            // Upload Image to imgbb
            const formData = new FormData();
            formData.append("image", imageFile);

            const imageResponse = await axios.post(image_api, formData);
            // console.log(imageResponse.data);

            if (imageResponse.data.success) {
                const taskImageUrl = imageResponse.data.data.url;

                // Prepare data to send to the backend
                const taskData = {
                    email: user?.email,
                    taskTitle,
                    taskDetail,
                    requiredWorkers: worker,
                    payableAmount,
                    completionDate,
                    submissionInfo,
                    taskImageUrl,
                };

                // end data to the backend
                const backendResponse = await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, taskData);

                if (backendResponse.data.insertedId) {
                    // Calculate updated coin value
                    const updatedCoin = coin - totalAmount;

                    // Update coin on server and locally
                    try {
                        const coinResponse = await axios.patch(`${import.meta.env.VITE_API_URL}/users/coin`, {
                            email: user?.email,
                            coin: updatedCoin,
                        });

                        console.log(coinResponse);

                        if (coinResponse.data.success) {
                            setCoin(updatedCoin);
                            toast.success("Task added successfully!");
                            form.reset();
                        }
                    } catch (error) {
                        console.error("Error updating coin:", error);
                    }
                }


            } else {
                toast.error("Image upload failed. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Add New Task</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Task Title */}
                <div className="form-control">
                    <label htmlFor="taskTitle" className="label font-semibold">
                        Task Title
                    </label>
                    <input
                        type="text"
                        id="taskTitle"
                        name="taskTitle"
                        placeholder="Enter Your Title"
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Task Detail */}
                <div className="form-control">
                    <label htmlFor="taskDetail" className="label font-semibold">
                        Task Detail
                    </label>
                    <textarea
                        id="taskDetail"
                        name="taskDetail"
                        placeholder="Provide detailed description of the task"
                        className="textarea textarea-bordered w-full"
                    ></textarea>
                </div>

                {/* Required Workers */}
                <div className="form-control">
                    <label htmlFor="worker" className="label font-semibold">
                        Required Workers
                    </label>
                    <input
                        type="number"
                        id="worker"
                        name="worker"
                        className="input input-bordered w-full"
                        min="0"
                    />
                </div>

                {/* Payable Amount */}
                <div className="form-control">
                    <label htmlFor="payableAmount" className="label font-semibold">
                        Payable Amount (per worker)
                    </label>
                    <input
                        type="number"
                        id="payableAmount"
                        name="payableAmount"
                        className="input input-bordered w-full"
                        min="0"
                    />
                </div>

                {/* Completion Date */}
                <div className="form-control">
                    <label htmlFor="completionDate" className="label font-semibold">
                        Completion Date
                    </label>
                    <input
                        type="date"
                        id="completionDate"
                        name="completionDate"
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Submission Info */}
                <div className="form-control">
                    <label htmlFor="submissionInfo" className="label font-semibold">
                        Submission Info
                    </label>
                    <input
                        type="text"
                        id="submissionInfo"
                        name="submissionInfo"
                        placeholder="Upload a screenshot as proof And Details"
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Task Image */}
                <div className="form-control">
                    <label htmlFor="taskImageUrl" className="label font-semibold">
                        Task Image
                    </label>
                    <input
                        type="file"
                        id="taskImageUrl"
                        name="taskImageUrl"
                        className="file-input file-input-bordered w-full"
                    />
                </div>

                {/* Submit Button */}
                <input
                    value="Add Task"
                    type="submit"
                    className="btn btn-primary w-full mt-4"
                />
            </form>
        </div>
    );
};

export default AddNewTask;
