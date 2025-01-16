import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "react-toastify";
import useAuth from "../../../hook/useAuth";
import { useNavigate } from "react-router-dom";

const CheckOutForm = ({ amount }) => {
    const { user,refetch } = useAuth();
    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();
    const amountInCents = parseInt(amount);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);

        // Get clientSecret from the backend
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/create-payment-intent`, {
            amount: amountInCents,
        });

        const clientSecret = data.clientSecret;

        // Confirm the payment
        const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user.email,
                },
            },
        });

        if (error) {
            console.error("Payment Error:", error);
            toast.error("Payment Failed");
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            toast.success("Payment Successful!");
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/payment-success/${user.email}`, {
                    paymentId: paymentIntent.id,
                    amount: paymentIntent.amount,
                });
                refetch();
                navigate('/dashboard/paymentHistory');
                
            } catch (err) {
                toast.error("Payment recorded successfully, but failed to update backend.");
            };
        };
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement className="p-4 border rounded" />
            <button
                type="submit"
                disabled={!stripe}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
                Pay ${(amountInCents / 100).toFixed(2)}
            </button>
        </form>
    );
};

export default CheckOutForm;
