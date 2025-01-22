import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import 'animate.css';
import { Bounce } from "react-awesome-reveal";

const TopWorker = () => {
    const { data: topWorkers = [] } = useQuery({
        queryKey: ['topWorkers'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/top`);
            return res.data;
        }
    });

    return (
        <div className="animate__animated animate__backInLeft animate__slow">
            <Bounce>
                <h2 className="text-4xl font-bold mb-10 mt-16 text-center"><span className="text-blue-500">Best</span> Workers</h2>
            </Bounce>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {topWorkers.map((worker) => (
                    <div
                        key={worker._id}
                        className="p-4 border rounded shadow hover:shadow-lg transition duration-300"
                    >
                        <img
                            src={worker.imageUrl}
                            alt={worker.name}
                            className="w-24 h-24 rounded-full mx-auto object-cover"
                        />
                        <h3 className="text-lg font-semibold text-center mt-3">
                            {worker.name}
                        </h3>
                        <p className="text-center text-gray-500">
                            <span className="text-blue-500">Coins:</span> <span className="font-bold">{worker.userCoin}</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopWorker;