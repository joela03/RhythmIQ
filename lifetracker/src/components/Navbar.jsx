import React, { useState } from 'react';
import SignupPopup from './SignupPopup';

const Navbar = () => {
    const [isSignupOpen, setIsSignupOpen] = useState(false);

    const handleGetStartedClick = () => {
        setIsSignupOpen(true);
    };

    const handleCloseSignup = () => {
        setIsSignupOpen(false);
    };

    return (
        <>
            <nav className="w-full sticky top-0 z-50 bg-white shadow-md">
                <div className="flex justify-between items-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-4">
                    <div className="flex items-center gap-3">
                        <img src="/gradient-abstract-logo_23-2150689652.avif" className="h-20" alt="Logo" />
                        <h1 className="text-2xl font-bold text-gray-700">LifeTracker</h1>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 w-30 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
                            Login
                        </button>
                        <button 
                            onClick={handleGetStartedClick}
                            className="px-4 py-2 w-30 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            <SignupPopup 
                isOpen={isSignupOpen} 
                onClose={handleCloseSignup} 
            />
        </>
    );
};

export default Navbar;