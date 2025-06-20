
const Loading = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-light">
            <div className="relative w-16 h-16 -mt-32 md:-mt-10">
                {/* Outer Ring */}
                <div className="w-16 h-16 border-4 border-gray-300 rounded-full animate-spin border-t-blue-500"></div>
                
                {/* Inner Dot */}
                {/* <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div> */}
            </div>
        </div>
    );
};

export default Loading;
