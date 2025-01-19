import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

// Static testimonial data
const testimonials = [
    {
        id: 1,
        name: "John Doe",
        feedback: "This platform has changed the way I work. Highly recommended!",
        image: "https://i.ibb.co.com/m8NvYtp/images-4.jpg",
    },
    {
        id: 2,
        name: "Jane Smith",
        feedback: "Amazing experience! The team is super helpful and supportive.",
        image: "https://i.ibb.co.com/yp42cdf/ddf.jpg",
    },
    {
        id: 3,
        name: "Alex Johnson",
        feedback: "I've earned a lot from this platform. Great for freelancers!",
        image: "https://i.ibb.co.com/f1B56CV/sdfd.jpg",
    },
    {
        id: 4,
        name: "John Due",
        feedback: "This platform has changed the way I work. Highly recommended!",
        image: "https://i.ibb.co.com/P93zF7R/feedback3.jpg",
    },
    {
        id: 5,
        name: "Jani Smith",
        feedback: "Amazing experience! The team is super helpful and supportive.",
        image: "https://i.ibb.co.com/23WVZd6/images-3.jpg",
    },
    {
        id: 6,
        name: "Alex Hex",
        feedback: "I've earned a lot from this platform. Great for freelancers!",
        image: "https://i.ibb.co.com/2Z6YvYJ/feedback2.webp",
    },
];

const Testimonial = () => {
    return (
        <div className="py-10 bg-blue-100 my-[70px]">
            <h2 className="text-3xl font-bold text-center mb-6">What Our Users Say</h2>
            <Swiper
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
                className="w-4/5 mx-auto"
            >
                {testimonials.map((testimonial) => (
                    <SwiperSlide key={testimonial.id}>
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                            />
                            <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                            <p className="text-gray-600 italic my-2">{`"${testimonial.feedback}"`}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Testimonial;
