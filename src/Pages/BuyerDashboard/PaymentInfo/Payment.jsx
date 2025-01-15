import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import { useParams } from "react-router-dom";


const Payment = () => {
    const { amount } = useParams(); // Get amount from the URL
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

// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckOutForm from "./CheckOutForm";

// const Payment = () => {
//     const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

//     // URL থেকে পেমেন্ট অ্যামাউন্ট প্যারামিটার পেতে React Router ব্যবহার করুন
//     const searchParams = new URLSearchParams(window.location.search);
//     const amount = searchParams.get("amount");

//     return (
//         <div>
//             <h2 className="text-2xl font-bold text-center mb-4">Complete Your Payment</h2>
//             <div className="max-w-md mx-auto">
//                 <Elements stripe={stripePromise}>
//                     <CheckOutForm amount={amount}></CheckOutForm>
//                 </Elements>
//             </div>
//         </div>
//     );
// };

// export default Payment;
