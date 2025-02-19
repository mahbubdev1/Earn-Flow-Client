import About from "./About";
import Banner from "./Banner";
import Blogs from "./Blogs";
import ChooseCategory from "./ChooseCategory";
import Footer from "./Footer";
import Testimonial from "./Testimonial";
import TopWorker from "./TopWorker";
import Works from "./Works";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <div className="container mx-auto">
                <TopWorker></TopWorker>
                <Testimonial></Testimonial>
                <About></About>

            </div>
            <div>
                <ChooseCategory></ChooseCategory>
            </div>
            <div className="container mx-auto">
                <Blogs></Blogs>
            </div>
            <Works></Works>
            <Footer></Footer>
        </div>
    );
};

export default Home;