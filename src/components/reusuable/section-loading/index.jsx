import React from 'react';

const SectionLoading = () => {
    return (
        <div className="flex justify-center items-center w-full h-40 my-10 bg-light">
            <div className="relative w-16 h-16 -mt-32 md:-mt-10">
                <div className="w-10 h-10 border-4 border-gray-300 rounded-full animate-spin border-t-blue-500"></div>
            </div>
        </div>
    );
};

export default SectionLoading;