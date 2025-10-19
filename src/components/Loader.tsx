import React from 'react';

const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-blue-500" />
            <p className="mt-4 text-lg text-gray-400">กำลังดึงข้อมูล...</p>
        </div>
    );
};

export default Loader;