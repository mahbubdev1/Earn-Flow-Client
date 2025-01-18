import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const AdminHome = () => {

    // Fetch withdrawals
    const { data: withdrawals = [], isLoading, refetch } = useQuery({
        queryKey: ['withdrawals'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/withdrawals`);
            return res.data;
        }
    });

    const handlePaymentSuccess = (id, worker_email, withdrawal_coin) => {
        axios.patch(`${import.meta.env.VITE_API_URL}/withdrawals/approve/${id}`, {
            email: worker_email,
            withdrawal_coin: withdrawal_coin
        })
            .then(result => {
                if (result.data.modifiedCount > 0) {
                    toast.success('Payment Update Success')
                    refetch();
                }
            })
    }

    // Loader while fetching
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-5">Withdrawal Requests</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
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
