import { useNavigate } from "react-router-dom";

const PurchaseCoin = () => {
    const navigate = useNavigate();

    // Coin packages
    const coinPackages = [
        { coins: 10, price: 1 },
        { coins: 150, price: 10 },
        { coins: 500, price: 20 },
        { coins: 1000, price: 35 },
    ];

    // Handle card click to redirect to payment
    const handlePurchase = (price) => {
        navigate(`/dashboard/pay/${price * 100}`); // Redirect with amount in cents
    };

    return (
        <div className="container mx-auto mt-10">
            <h2 className="text-2xl font-bold text-center mb-6">Purchase Coins</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {coinPackages.map((pkg, index) => (
                    <div
                        key={index}
                        className="bg-gray-100 shadow-md rounded-lg p-6 text-center cursor-pointer hover:shadow-lg transition"
                        onClick={() => handlePurchase(pkg.price)}
                    >
                        <h3 className="text-xl font-bold mb-4">{pkg.coins} Coins</h3>
                        <p className="text-lg text-green-600 font-semibold">${pkg.price}</p>
                        <button className="bg-blue-500 text-white py-2 px-4 mt-4 rounded hover:bg-blue-600">
                            Buy Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PurchaseCoin;
