import React, { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import Chatbot from '../miscellaneous/Chatbot';

const Landing = () => {
    const { darkMode, isBotopen } = useContext(ThemeContext)

    return (
        <div className={`h-full flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`} >
            <Header />
            <div className="flex flex-1 pt-16">
                <Sidebar />
                <Outlet />
                {isBotopen && <Chatbot />}
            </div>
        </div>
    );
};

export default Landing;
