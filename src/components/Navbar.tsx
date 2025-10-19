import React from 'react';

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/5 shadow-lg backdrop-blur-lg">
            <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
                <h1 className="text-2xl font-bold text-white">LOTTO</h1>
                <span className="animate-pulse rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
                    LIVE
                </span>
            </div>
        </nav>
    );
};

export default Navbar;