import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hook/useAuth";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label, LabelList } from 'recharts';
import Loading from "../../Components/ErrorLoading/Loading";

const WorkerHome = () => {
    const { user } = useAuth();

    // Fetch submissions
    const { data: submissions = [], isLoading } = useQuery({
        queryKey: ["submissionsData", user?.email],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/submissions/data/${user?.email}`);
            return res.data;
        },
    });

    // Fetch completed tasks
    const { data: completeTask = [], isLoading: loading } = useQuery({
        queryKey: ['tasks', user?.email],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/tasks/complete/${user?.email}`);
            return res.data;
        }
    });

    const totalSubmissions = submissions.length;
    const totalPendingSubmissions = submissions.filter(submission => submission.status === 'pending').length;
    const totalEarnings = completeTask.reduce((acc, task) => acc + task.payable_amount, 0);

    const chartData = [
        { name: 'Total Submissions', value: totalSubmissions },
        { name: 'Pending Submissions', value: totalPendingSubmissions },
        { name: 'Total Earnings', value: totalEarnings }
    ];

    if(isLoading || loading){
        return <Loading></Loading>
    }

    return (
        <div>
            <div>
                {/* Display Chart */}
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        width={730}
                        height={250}
                        data={chartData}
                        margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name">
                            <Label offset={0} position="insideBottom" />
                        </XAxis>
                        <YAxis label={{ value: 'pv of page', angle: -90, fill: 'blue' , position: 'insideLeft', textAnchor: 'middle' }} />
                        <Bar dataKey="value" fill="#8884d8">
                            <LabelList dataKey="name" fill="gray-500" position="insideTop" angle="45" />
                        </Bar>
                        <Bar dataKey="value" fill="#82ca9d">
                            <LabelList dataKey="value" position="top" />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <h2 className="mb-1 mt-7 text-3xl font-bold text-center">Approve List</h2>
            <div className="overflow-x-auto mt-9">
                <table className="table table-base table-pin-rows table-pin-cols">
                    <thead>
                        <tr className="text-black text-base">
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
        </div>
    );
};

export default WorkerHome;