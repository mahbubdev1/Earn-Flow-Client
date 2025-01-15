import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "react-toastify";
import useAuth from "../../../hook/useAuth";

const CheckOutForm = ({ amount }) => {
    const { coin, setCoin, user } = useAuth();

    const stripe = useStripe();
    const elements = useElements();
    const amountInCents = parseInt(amount);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);

        // Step 1: Get clientSecret from the backend
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/create-payment-intent`, {
            amount: amountInCents,
        });

        const clientSecret = data.clientSecret; // Extract clientSecret

        // Step 2: Confirm the payment
        const userId = localStorage.getItem('access-token');
        const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: userId, // Replace with dynamic user data if available
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
                    paymentIntentId: paymentIntent.id,
                    amount: paymentIntent.amount,
                });
                console.log(response);
            } catch (backendError) {
                alert("Payment recorded successfully, but failed to update backend.");
            }


            // console.log(paymentIntent);

            // if (paymentIntent.amount === 100) {
            //     console.log("payment amount", coin + 10);
            //     setCoin(coin + 10);
            // }
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
