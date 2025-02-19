const Leaderboard = () => {
    const topEarners = [
        { id: 1, name: "John Doe", earnings: "$2500", rank: "🥇" },
        { id: 2, name: "Jane Smith", earnings: "$2300", rank: "🥈" },
        { id: 3, name: "Alex Brown", earnings: "$2100", rank: "🥉" },
        { id: 4, name: "Chris Green", earnings: "$1900", rank: "🔥" },
        { id: 5, name: "Emma Wilson", earnings: "$1800", rank: "💎" },
    ];

    return (
        <div className="bg-white py-12 px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                Top Earners & Leaderboard
            </h2>

            {/* Top Earners */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
                {topEarners.map((earner) => (
                    <div
                        key={earner.id}
                        className="bg-gray-100 shadow-md rounded-lg p-4 w-72 text-center hover:shadow-lg transition-all"
                    >
                        <div className="text-4xl mb-2">{earner.rank}</div>
                        <h3 className="text-xl font-semibold text-gray-700">{earner.name}</h3>
                        <p className="text-gray-500 mt-2">Earnings: {earner.earnings}</p>
                    </div>
                ))}
            </div>

            {/* Leaderboard Table */}
            <div className="overflow-x-auto container mx-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="px-4 py-2">Rank</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Earnings</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topEarners.map((earner, index) => (
                            <tr key={index} className="border-t hover:bg-gray-100">
                                <td className="px-4 py-2">{earner.rank}</td>
                                <td className="px-4 py-2">{earner.name}</td>
                                <td className="px-4 py-2">{earner.earnings}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;