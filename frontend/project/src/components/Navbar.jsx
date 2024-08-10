import React from 'react';
import { Link } from 'react-router-dom';    
import image from '../assets/backimg.jpg';

const Navbar = () => {
    return (
        <div className="navbar-container flex items-center justify-between bg-white/30 backdrop-blur-md shadow-2xl p-1 rounded-2xl absolute top-0 left-0 w-full z-10">
            <div className="logo">
                <img src={image} alt="Logo" className="h-15 w-24 object-cover z-1" />
            </div>
            <div className="navbar-buttons flex gap-4">
                <Link to="/" className="bt px-4 py-2 font-bold text-md rounded-lg transition ease-in-out hover:bg-lime-500">
                    Home
                </Link>
                <Link to="/home" className="bt px-4 py-2 font-bold text-md rounded-lg transition ease-in-out hover:bg-lime-500">
                    Kisaan GPT
                </Link>
                <Link to="/home?option=form" className="bt px-4 py-2 font-bold text-md rounded-lg transition ease-in-out hover:bg-lime-500">
                    Form
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
