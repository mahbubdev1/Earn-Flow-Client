import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hook/useAuth";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";


const BuyerHome = () => {
    const { user } = useAuth();
    const [selectedSubmission, setSelectedSubmission] = useState(null);

    const {data: submissions = [], refetch} = useQuery({
        queryKey: ['tasks', user?.email],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/tasks/worker/${user?.email}`)
            return res.data;
        }
    });

    const handleApprove = async (id, workerEmail, coin) => {
        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/submissions/approve/${id}`, { workerEmail, coin });
            toast.success("Submission approved successfully!");
            refetch();
        } catch (error) {
            console.error(error);
            toast.error("Failed to approve the submission.");
        }
    };

    
    
    return (
        <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Buyer Submissions</h2>
        {submissions.length > 0 ? (
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Worker Name</th>
                            <th>Task Title</th>
                            <th>Payable Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map((submission) => (
                            <tr key={submission._id}>
                                <td>{submission.worker_name}</td>
                                <td>{submission.task_title}</td>
                                <td>${submission.payable_amount}</td>
                                <td>
                                    <button
                                        className="btn btn-info btn-sm mr-2"
                                        onClick={() => setSelectedSubmission(submission)}
                                    >
                                        View
                                    </button>
                                    <button
                                        className="btn btn-success btn-sm mr-2"
                                        onClick={() => handleApprove(submission._id, submission.worker_email, submission.payable_amount)}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="btn btn-error btn-sm"
                                        onClick={() => handleReject(submission._id, submission.task_id)}
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ) : (
            <p className="text-gray-500">No submissions found.</p>
        )}

        {/* Modal for View Submission */}
        {selectedSubmission && (
            <div className="modal modal-open">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Submission Details</h3>
                    <p>{selectedSubmission.submission_details}</p>
                    <div className="modal-action">
                        <button className="btn" onClick={() => setSelectedSubmission(null)}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
    );
};

export default BuyerHome;