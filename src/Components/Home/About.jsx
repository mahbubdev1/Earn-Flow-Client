import 'animate.css';
import { Fade } from 'react-awesome-reveal';
const About = () => {
    return (
        <Fade direction='left' duration={1500} delay={200}>
            <div className="lg:flex items-center justify-between py-16 bg-white">
                {/* Text Section */}
                <div className="lg:w-1/2">
                    <h4 className="text-blue-500 text-sm font-bold uppercase">About Us</h4>
                    <h2 className="text-4xl font-bold text-gray-900 mt-4">
                        Discover Tasks That Suit Your Skills <br /> And Start Earning Today.
                    </h2>
                    <p className="text-gray-600 mt-4 leading-relaxed">
                        Our platform connects you to a wide variety of micro-tasks that match your
                        skills and interests. Whether you're looking to earn extra income or develop
                        new expertise, we've got something for everyone. Join our growing community
                        and start your journey toward financial independence today!
                    </p>

                    <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                        View Job →
                    </button>
                </div>

                {/* Image Section */}
                <div className="relative lg:w-1/2 max-lg:mt-10">
                    <div className="absolute top-4 left-4 w-full h-full border-2 border-green-600 rounded-lg"></div>
                    <div className="relative">
                        <img
                            src="https://i.ibb.co/SwVB7TS/kmpl3-Iy-1024x614.jpg"
                            alt="About Us"
                            className="rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </Fade>
    );
};

export default About;