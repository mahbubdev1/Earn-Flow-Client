import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hook/useAuth";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { Pie, PieChart } from "recharts";
import useAxiosSecure from "../../hook/useAxiosSecure";
import Loading from "../../Components/ErrorLoading/Loading";


const BuyerHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [selectedSubmission, setSelectedSubmission] = useState(null);

    const { data: submissions = [], refetch, isLoading } = useQuery({
        queryKey: ['tasks', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tasks/worker/${user?.email}`)
            return res.data;
        }
    });

    const handleApprove = async (id, workerEmail, coin, buyer_name, task_title) => {
        const notificationData = {
            message: `Your Have Earn ${coin} Coin. From ${buyer_name}, for completing ${task_title}`,
            workerEmail: workerEmail,
            time: new Date().toISOString(),
        };
        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/submissions/approve/${id}`, { workerEmail, coin })
                .then(async () => {
                    await axios.post(`${import.meta.env.VITE_API_URL}/notifications`, notificationData)
                        .then(() => {
                            toast.success("Submission approved successfully!");
                            refetch();
                        })
                })
        } catch {
            // console.error(error);
            toast.error("Failed to approve the submission.");
        }
    };

    const handleReject = async (id, taskId, buyer_name, task_title, workerEmail) => {
        const notificationData = {
            message: `Sorry Mr. ${buyer_name}, your work is rejected ${task_title}`,
            workerEmail: workerEmail,
            time: new Date().toISOString(),
        }
        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/submissions/reject/${id}`, { taskId })
                .then(async () => {
                    await axios.post(`${import.meta.env.VITE_API_URL}/notifications`, notificationData)
                        .then(() => {
                            toast.error("Submission rejected successfully!");
                            refetch();
                        })
                })
        } catch {
            toast.error("Failed to reject the submission.");
        }
    };

    const { data: allSubmission = [], isLoading: loading } = useQuery({
        queryKey: ['submission', user?.email],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/submissions/all/${user?.email}`)
            return res.data;
        }
    });
    const totalSubmission = allSubmission.length;
    const totalPending = allSubmission.filter(task => task.status === 'pending').length;
    const totalCoin = allSubmission.filter(task => task.status === 'approved').reduce((total, sum) => total + sum.payable_amount, 0)

    const chartsData = [
        { name: 'All Submission', value: totalSubmission, fill: "#8884d8" },
        { name: 'Total Pending', value: totalPending, fill: "red    " },
        { name: 'Total Coin', value: totalCoin, fill: "orange" },
    ];

    if(isLoading || loading){
        return <Loading></Loading>
    }

    return (
        <div className="p-6">
            <div className="flex justify-center">
                <PieChart width={300} height={250}>
                    <Pie data={chartsData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
                    <Pie data={chartsData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
                </PieChart>
            </div>
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
                                    <td className="flex">
                                        <button
                                            className="btn btn-info btn-sm mr-2 text-white"
                                            onClick={() => setSelectedSubmission(submission)}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="btn btn-success btn-sm mr-2 text-white"
                                            onClick={() => handleApprove(submission._id, submission.worker_email, submission.payable_amount, submission.task_title)}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className="btn btn-error btn-sm text-white"
                                            onClick={() => handleReject(submission._id, submission.task_id, submission.buyer_name, submission.task_title, submission.worker_email)}
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