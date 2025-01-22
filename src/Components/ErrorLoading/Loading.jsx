import loading from '../../assets/Lootie/Loading_2.gif'

const Loading = () => {
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <img className='w-[300px]' src={loading} alt="" />
        </div>
    );
};

export default Loading;