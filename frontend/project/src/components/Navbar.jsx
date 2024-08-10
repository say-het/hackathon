import React from 'react';
import { Link } from 'react-router-dom';
import image from '../assets/backimg.jpg';

const Navbar = () => {
    return (
        <div className="navbar-container backdrop-filter backdrop-blur-lg flex items-center justify-between bg-gradient-to-r from-green-100 to-green-300 shadow-2xl p-4 rounded-xl  absolute top-0 left-0 w-full z-10">
            <div className="text-5xl font-bold inline-block rounded-lg">
                <span className="text-green-700 font-extrabold italic">A</span>
                <span className="text-gray-900 font-light tracking-wide">gr</span>
                <span className="text-green-700 font-extrabold italic">I</span>
                <span className="text-gray-900 font-light tracking-wide">culture</span>
            </div>

            <div className="navbar-buttons flex gap-4">
                <Link to="/" className="bt px-4 py-2 font-bold text-md rounded-lg transition ease-in-out hover:bg-lime-500">
                    Home
                </Link>
                <Link to="/home" className="bt px-4 py-2 font-bold text-md rounded-lg transition ease-in-out hover:bg-lime-500">
                    Kisaan GPT
                </Link>
                <Link to="/home?option=form" className="bt px-4 py-2 font-bold text-md rounded-lg transition ease-in-out hover:bg-lime-500">
                    CropAdvisor
                </Link>
                <button className="bt px-4 py-2 font-bold text-md rounded-lg transition ease-in-out hover:bg-lime-500">
                    About Us
                </button>
                <button className="bt px-4 py-2 font-bold text-md rounded-lg transition ease-in-out hover:bg-lime-500">
                    Contact Us
                </button>
                <Link to="/signup" className="bt px-4 py-2 font-bold text-md rounded-lg transition ease-in-out hover:bg-lime-500">
                    Sign Up
                </Link>
                <Link to="/login" className="bt px-4 py-2 font-bold text-md rounded-lg transition ease-in-out hover:bg-lime-500">
                    Sign In
                </Link>
            </div>
        </div>
    );
}

export default Navbar;
