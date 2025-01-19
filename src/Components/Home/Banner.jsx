import banner1 from '../../assets/banner1.jpg';
import banner2 from '../../assets/banner2.jpg';
import banner3 from '../../assets/banner3.jpg';
import banner4 from '../../assets/banner4.jpg';
import banner5 from '../../assets/banner5.jpg';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Banner = () => {
    const slides = [
        { image: banner1, title: "Welcome to Our Platform", subtitle: "Connect, Collaborate, and Earn" },
        { image: banner2, title: "Simple Tasks, Big Rewards", subtitle: "Complete tasks and get paid quickly" },
        { image: banner3, title: "Grow Your Skills", subtitle: "Learn and earn with our community" },
        { image: banner4, title: "Empowering Workers", subtitle: "Your time and effort matter here" },
        { image: banner5, title: "Join Us Today", subtitle: "Discover opportunities that suit you" },
    ];

    return (
        <div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {slides.map((slide, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="relative">
                            <img
                                className="object-cover bg-cover h-[750px] w-full"
                                src={slide.image}
                                alt={`Banner ${idx + 1}`}
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white px-4">
                                <h2 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h2>
                                <p className="text-lg md:text-2xl">{slide.subtitle}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;
