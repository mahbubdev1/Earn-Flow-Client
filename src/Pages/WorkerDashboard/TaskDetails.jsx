import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hook/useAuth";

const TaskDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [submissionDetails, setSubmissionDetails] = useState("");

    const { data = {} } = useQuery({
        queryKey: ['tasks', id],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/tasks/${id}`);
            return res.data;
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const submissionData = {
            task_id: id,
            task_title: data.taskTitle,
            payable_amount: data.payableAmount,
            worker_email: user.email,
            submission_details: submissionDetails,
            worker_name: user.displayName,
            buyer_name: data.buyerName,
            buyer_email: data.email,
            current_date: new Date().toISOString(),
            status: "pending"
        };

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/submissions`, submissionData);
            if (res.data.insertedId) {
                Swal.fire("Success", "Your submission has been saved!", "success");
                setSubmissionDetails("");
            }
        } catch (error) {
            Swal.fire("Error", "Failed to save submission!", "error");
        }
    };

    return (
        <div className="p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                <img className="w-full h-60 object-cover" src={data.taskImageUrl} alt={data.taskTitle} />
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4 text-blue-600">{data.taskTitle}</h1>
                    <p className="text-gray-700 mb-2"><strong>Buyer Name:</strong> {data.buyerName}</p>
                    <p className="text-gray-700 mb-2"><strong>Buyer Email:</strong> {data.email}</p>
                    <p className="text-gray-700 mb-2"><strong>Completion Date:</strong> {new Date(data.completionDate).toLocaleDateString()}</p>
                    <p className="text-gray-700 mb-2"><strong>Payable Amount:</strong> ${data.payableAmount}</p>
                    <p className="text-gray-700 mb-4"><strong>Task Details:</strong> {data.taskDetail}</p>
                </div>
            </div>

            {/* Submission Form */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold text-blue-500 mb-4">Submit Your Work</h2>
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label htmlFor="submissionDetails" className="block text-gray-700 font-medium mb-2">Submission Details</label>
                        <textarea
                            id="submissionDetails"
                            name="submissionDetails"
                            value={submissionDetails}
                            onChange={(e) => setSubmissionDetails(e.target.value)}
                            placeholder="Describe your submission details here..."
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="5"
                            required
                        ></textarea>
                    </div>
                    <input
                        value='Submit'
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
                    >                      
                    </input>
                </form>
            </div>
        </div>
    );
};

export default TaskDetails;
