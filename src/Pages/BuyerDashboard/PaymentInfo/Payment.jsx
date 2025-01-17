import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import { useParams } from "react-router-dom";


const Payment = () => {
    const { amount } = useParams(); 
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

    return (
        <div>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckOutForm amount={amount}></CheckOutForm>
                </Elements>
            </div>
        </div>
    );
};
export default Payment;