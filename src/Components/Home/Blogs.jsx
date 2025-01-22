import { Bounce, Fade, Zoom } from "react-awesome-reveal";

const Blogs = () => {
    const blogs = [
        {
            id: 1,
            title: "What Are Micro Tasks? How to Earn Money Doing Micro Tasks?",
            date: "25 May 2024",
            description: "Micro-tasks provide the opportunity to earn...",
            image: 'https://i.ibb.co.com/LtcgfLm/images.jpg'
        },
        {
            id: 2,
            title: "Earn With Micro Jobs: Guide For Making Side Income",
            date: "25 May 2024",
            description:
                "Micro Jobs allow you to become an independent contractor...",
            image: 'https://i.ibb.co.com/R2rwtLf/work1.jpg'
        },
        {
            id: 3,
            title: "Get Paid to Take Surveys  Guide For Making Side Income",
            date: "27 May 2024",
            description:
                "Using your opinions and turning them into cash is simple...",
            image: 'https://i.ibb.co.com/P4w7tQL/work2.jpg'
        },
    ];

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-center text-4xl font-bold mb-2">Latest <span className="text-blue-500">Blogs</span></h1>
            <p className="text-center text-gray-500 mb-8">
                Read Latest Blogs from Picoworkers
            </p>

            <div className="grid md:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <div
                        key={blog.id}
                        className="bg-white shadow-lg rounded-lg overflow-hidden"
                    >
                        <Zoom>
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-72 object-cover"
                            />
                        </Zoom>
                        <div className="p-6">
                            <Fade direction="up">
                                <h2 className="text-lg font-bold mb-2">{blog.title}</h2>
                            </Fade>
                            <Fade>
                                <p className="text-gray-500 text-sm mb-4">{blog.date}</p>
                                <p className="text-gray-700 text-sm mb-4">{blog.description}</p>
                                <a
                                    href={`/blog/${blog.id}`}
                                    className="text-blue-500 hover:underline"
                                >
                                    Read More
                                </a>
                            </Fade>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blogs;
