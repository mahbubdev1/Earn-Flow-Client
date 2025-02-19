const Works = () => {
    const steps = [
        {
            id: 1,
            title: "Sign Up",
            description: "Create your free account in just a few seconds.",
            icon: "📝",
        },
        {
            id: 2,
            title: "Complete Tasks",
            description: "Choose tasks that match your skills and complete them.",
            icon: "✅",
        },
        {
            id: 3,
            title: "Earn Rewards",
            description: "Get paid for your work directly in your wallet.",
            icon: "💰",
        },
        {
            id: 4,
            title: "Withdraw Money",
            description: "Withdraw your earnings securely via multiple methods.",
            icon: "🏦",
        },
    ];

    return (
        <div className="bg-gray-100 py-14 px-6 mb-14">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step) => (
                        <div
                            key={step.id}
                            className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition-all"
                        >
                            <div className="text-4xl mb-4">{step.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-700">{step.title}</h3>
                            <p className="text-gray-500 mt-2">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Works;