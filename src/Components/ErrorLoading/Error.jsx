import { Link } from 'react-router-dom';
import oopsSVG from '../../assets/Lootie/error.json'
import Lottie from 'lottie-react';

const Error = () => {
    return (
        <div className='max-h-screen flex flex-col justify-center items-center space-y-3'>
            <Lottie animationData={oopsSVG} loop={true} />
            <h2 className='text-3xl font-bold'>
                <span className='font-serif'>404</span> - Oops! This Page Could Not Be Found
            </h2>

            <Link to='/' className='bg-blue-500 text-white px-5 py-2 rounded-xl'><button>Go to Home</button></Link>
        </div>
    );
};

export default Error;