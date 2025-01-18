import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../../hook/useAuth";
import { toast } from "react-toastify";

const WithDrawals = () => {
    const { coin, user, refetch } = useAuth();
    const [withdrawCoin, setWithdrawCoin] = useState(0);
    const [paymentSystem, setPaymentSystem] = useState("");
    const [accountNumber, setAccountNumber] = useState("");

    // Calculate withdrawal amount
    const withdrawAmount = (withdrawCoin / 20).toFixed(2);

    // Handle input change
    const handleWithdrawCoinChange = (e) => {
        const inputValue = Number(e.target.value);

        // Validate input and restrict it within the range
        if (inputValue > coin) {
            setWithdrawCoin(coin);
            toast.warning(`You can only withdraw up to ${coin} coins.`);
        } else {
            setWithdrawCoin(inputValue);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (withdrawCoin > coin) {
            toast.error("You cannot withdraw more than your total coins!");
            return;
        }

        if (withdrawCoin < 200) {
            return toast.error('Minimum Withdraw 200 coin')
        }

        const withdrawalData = {
            worker_email: user.email,
            worker_name: user.displayName,
            withdrawal_coin: withdrawCoin,
            withdrawal_amount: withdrawAmount,
            payment_system: paymentSystem,
            account_number: accountNumber,
            withdraw_date: new Date().toISOString(),
            status: "pending",
        };

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/withdrawals`, withdrawalData);
            if (res.data.insertedId) {
                refetch();
                Swal.fire("Success", "Withdrawal request submitted!");
                setWithdrawCoin(0);
                setPaymentSystem("");
                setAccountNumber("");
            }
        } catch (error) {
            Swal.fire("Error", "Failed to submit withdrawal request!");
        }
    };

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto">
            <h1 className="text-xl font-semibold mb-4">Withdrawals</h1>
            <p className="mb-2">Your Total Coins: {coin}</p>
            <p className="mb-4">Withdrawal Amount: ${((coin / 20).toFixed(2))}</p>

            {coin >= 200 ? (
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1">Coin to Withdraw:</label>
                        <input
                            type="text"
                            value={withdrawCoin}
                            onChange={handleWithdrawCoinChange}
                            max={coin}
                            className="border p-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Withdraw Amount ($):</label>
                        <input
                            type="text"
                            value={withdrawAmount}
                            readOnly
                            className="border p-2 w-full bg-gray-200"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Select Payment System:</label>
                        <select
                            value={paymentSystem}
                            onChange={(e) => setPaymentSystem(e.target.value)}
                            className="border p-2 w-full"
                            required
                        >
                            <option value="">Select Payment System</option>
                            <option value="Bkash">Bkash</option>
                            <option value="Rocket">Rocket</option>
                            <option value="Nagad">Nagad</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Account Number:</label>
                        <input
                            type="text"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            className="border p-2 w-full"
                            required
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                        Withdraw
                    </button>
                </form>
            ) : (
                <p className="text-red-500">Insufficient coin to withdraw.</p>
            )}
        </div>
    );
};

export default WithDrawals;
