import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ThemeContext from '../../context/ThemeContext';
import { Avatar } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import BedtimeOutlinedIcon from '@mui/icons-material/BedtimeOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import logo from '../../../assets/verisk_tm_h_white_rgb.png'

const Header = () => {
    const { darkMode, setDarkMode, isNavOpen, setIsNavOpen } = useContext(ThemeContext);

    return (
        <div className={`fixed top-0 left-0 right-0 flex justify-between items-center pl-2 pr-6 md:pr-14 py-2 shadow-md z-50 transition-all duration-300 ${!darkMode ? 'text-white' : 'text-white'}`} style={{ backgroundColor: darkMode ? '#54585A' : '#1976d2'}}>
            <div className="flex items-center">
                <MenuOutlinedIcon className='mr-7' style={{ height: "40px", width: "40px", padding:'3px', cursor: "pointer"}} onClick={() => setIsNavOpen(!isNavOpen) } title="Nav Bar" />
                <Link to="/" className={`flex items-center focus:outline-none mr-2`}> 
                    <img src={logo} style={{ height: "30px", cursor: "pointer"}}/>
                </Link>
                <h1 className="text-lg md:text-2xl font-semibold pl-2">Unified Compliance Portal</h1>
            </div>
            <div className="flex items-center space-x-4">
                {/* Theme Toggle Button */}
                <div className={`px-2 py-1 rounded-md transition-all duration-300 ${darkMode ? 'bg-gray-200 text-black' : 'bg-gray-200 text-black hover:bg-gray-300'}`}>
                    <NotificationsNoneIcon />
                    <button title='User' className="ml-2 text-sm md:text-base">Notifications</button>
                </div>
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`flex p-2 rounded-xl transition-all duration-300 ${darkMode ? 'bg-gray-200 text-black' : 'bg-gray-200 text-black'}`}
                >
                    {darkMode ? <LightModeOutlinedIcon /> : <BedtimeOutlinedIcon />}
                </button>
                <Avatar src="/broken-image.jpg" className="w-8 h-8" />
            </div>
        </div>
    );
};

export default Header;
