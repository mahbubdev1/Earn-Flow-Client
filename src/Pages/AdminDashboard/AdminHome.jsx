import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { Pie, PieChart } from "recharts";
import useAxiosSecure from "../../hook/useAxiosSecure";
import Loading from "../../Components/ErrorLoading/Loading";

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch withdrawals
    const { data: withdrawals = [], isLoading, refetch } = useQuery({
        queryKey: ['withdrawals'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/withdrawals`);
            return res.data;
        }
    });

    const handlePaymentSuccess = (id, worker_email, withdrawal_coin) => {
        const notificationData = {
            worker_email: worker_email,
            role: 'buyer',
            date: new Date().toISOString(),
            withdrawal_coin,
            message: `Dear ${worker_email}, your withdrawal of ${withdrawal_coin} coins has been successfully processed. Thank you for using our platform!`
        };

        axios.patch(`${import.meta.env.VITE_API_URL}/withdrawals/approve/${id}`, {
            email: worker_email,
            withdrawal_coin: withdrawal_coin
        })
            .then(async result => {
                if (result.data.modifiedCount > 0) {
                    await axios.post(`${import.meta.env.VITE_API_URL}/notifications`, notificationData)
                        .then(() => {
                            toast.success('Payment Update Success')
                            refetch();
                        })
                }
            })
    };

    const { data: users = [], isLoading: loading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`)
            return res.data;
        }
    });

    const { data: withdrawal = [], isLoading: withdrawalLoading } = useQuery({
        queryKey: ['withdrawal'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/withdrawal/all`)
            return res.data;
        }
    });

    const withdrawAmount = withdrawal.reduce((amount, sum) => amount + sum.withdrawal_coin, 0)
    const totalWorker = users.filter(user => user.role === 'Worker').length;
    const totalBuyer = users.filter(user => user.role === 'Buyer').length;
    const totalCoin = users.reduce((user, sum) => user + sum.userCoin, 0);

    // Loader while fetching
    if (isLoading || loading || withdrawalLoading) {
        return <Loading></Loading>
    };

    const chartsData = [
        { name: 'Withdraw Amount', value: withdrawAmount, fill: "#8884d8" },
        { name: 'Total Workers', value: totalWorker, fill: "#82ca9d" },
        { name: 'Total Buyers', value: totalBuyer, fill: "#ffc658" },
        { name: 'Total Coins', value: totalCoin, fill: "#d84a87" },
    ];

    return (
        <div className="p-5">
            <div className="flex gap-7 max-sm:flex-col justify-center">
                <h1 className="text-lg sm:text-xl font-bold mb-5">Platform Overview</h1>
                <PieChart width={400} height={350}>
                    <Pie
                        data={chartsData}
                        dataKey="value"
                        nameKey="name"
                        cx="40%"
                        cy="40%"
                        innerRadius={60}
                        outerRadius={100}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    />
                </PieChart>
                <div className="my-4">
                    <ul className="flex flex-col items-start space-y-2">
                        {chartsData.map((item) => (
                            <li key={item.name} className="flex items-center">
                                <span
                                    className="w-4 h-4 mr-2"
                                    style={{ backgroundColor: item.fill }}
                                ></span>
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <h1 className="text-2xl font-bold mb-5">Withdrawal Requests</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr className="text-base text-gray-700">
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Payment System</th>
                            <th>Account Number</th>
                            <th>Withdraw Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {withdrawals.map((withdrawal, idx) => (
                            <tr key={withdrawal._id}>
                                <th>{idx + 1}</th>
                                <td>{withdrawal.worker_name}</td>
                                <td>{withdrawal.worker_email}</td>
                                <td>{withdrawal.payment_system}</td>
                                <td>{withdrawal.account_number}</td>
                                <td>${withdrawal.withdrawal_amount}</td>
                                <td>
                                    <span
                                        className={`badge ${withdrawal.status === "pending" ? "badge-warning" : "badge-success"
                                            }`}
                                    >
                                        {withdrawal.status}
                                    </span>
                                </td>
                                <td>
                                    {withdrawal.status === "pending" && (
                                        <button
                                            onClick={() => handlePaymentSuccess(withdrawal._id, withdrawal.worker_email, withdrawal.withdrawal_coin)}
                                            className="btn btn-sm btn-success text-white"
                                        >
                                            Payment
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminHome;
