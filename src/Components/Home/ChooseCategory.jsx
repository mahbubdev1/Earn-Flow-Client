import { Fade, Zoom } from "react-awesome-reveal";
import { FaLaptopCode, FaHome, FaBullhorn, FaUsers, FaHeartbeat, FaChalkboardTeacher, FaCode, FaChartLine } from "react-icons/fa";

const categories = [
    { id: 1, icon: <FaLaptopCode className="text-red-500 text-3xl" />, title: "UI/UX Designing", jobs: "300 Available Jobs" },
    { id: 2, icon: <FaHome className="text-orange-500 text-3xl" />, title: "Real Estate", jobs: "200 Available Jobs" },
    { id: 3, icon: <FaBullhorn className="text-blue-500 text-3xl" />, title: "Digital Marketing", jobs: "250 Available Jobs" },
    { id: 4, icon: <FaUsers className="text-purple-500 text-3xl" />, title: "Business Group", jobs: "399 Available Jobs" },
    { id: 5, icon: <FaHeartbeat className="text-green-500 text-3xl" />, title: "Medical & Health", jobs: "150 Available Jobs" },
    { id: 6, icon: <FaChalkboardTeacher className="text-pink-500 text-3xl" />, title: "Private Tutors", jobs: "199 Available Jobs" },
    { id: 7, icon: <FaCode className="text-purple-500 text-3xl" />, title: "Web Development", jobs: "205 Available Jobs" },
    { id: 8, icon: <FaChartLine className="text-yellow-500 text-3xl" />, title: "Share Market", jobs: "9 Available Jobs" },
];

const ChooseCategory = () => {
    return (
        <div className="bg-gray-50 py-16 my-16">
            <div className="container mx-auto">
                <div className="text-center">
                    <h4 className="text-blue-500 text-sm font-bold uppercase">Near Sectors</h4>
                    <h2 className="text-4xl font-bold text-gray-900 mt-2">Choose Your Category</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="flex flex-col items-center bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300"
                        >
                            <Zoom>
                                {category.icon}
                            </Zoom>
                            <Fade direction='up'>
                                <h3 className="text-xl font-semibold text-gray-800 mt-4">{category.title}</h3>
                                <p className="text-gray-600 mt-2">{category.jobs}</p>
                            </Fade>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChooseCategory;