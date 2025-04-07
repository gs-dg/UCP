import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';  
import ThemeContext from '../../context/ThemeContext';
import HomeIcon from '@mui/icons-material/Home';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import RuleIcon from '@mui/icons-material/Rule';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';
import NewReleasesOutlinedIcon from '@mui/icons-material/NewReleasesOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import './sidebar.css'

const Sidebar = () => {
    const { darkMode, isNavOpen } = useContext(ThemeContext);

    return (
        <div id='Navbar' className={`fixed left-0 top-14 h-[calc(100vh-3rem)] ${ isNavOpen ? 'w-48' :'w-16'} shadow-md flex flex-col items-center rounded-r-md overflow-y-auto ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} p-1`}>
            {[
                { to: "/", icon: DashboardOutlinedIcon, label: "Dashboard" },
                { to: "/accounts", icon: PeopleOutlineOutlinedIcon, label: "Accounts" },
                { to: "/config-rules", icon: RuleIcon, label: "Rule Explorer" },
                { to: "/exceptions", icon: AutoFixHighOutlinedIcon, label: "Exceptions" },
                { to: "/remediation", icon: LocalHospitalOutlinedIcon, label: "Remediation Center" },
                { to: "/resources", icon: AcUnitOutlinedIcon, label: "Resource Explorer" },
                { to: "/misconfigurations", icon: NewReleasesOutlinedIcon, label: "Misconfiguration" },
                { to: "/standards", icon: VerifiedUserOutlinedIcon, label: "Compliance Center" }
            ].map((item, index) => (
                <NavLink
                    key={index}
                    to={item.to}
                    className={({ isActive }) => `
                        w-full border-b p-2 flex items-center ${ !isNavOpen ? 'justify-center' : ''} cursor-pointer hover:scale-104
                        ${isActive ? (darkMode ? 'bg-gray-900' : 'sidebar-active') : ''}
                        ${darkMode ? 'hover:bg-gray-500 border-white' : 'text-gray-600 hover:bg-blue-100 border-black'} 
                        transition-all duration-200 ease-in-out
                    `}
                    title={ !isNavOpen ? item.label : ''}
                >
                    {/* Icon with hover transition */}
                    <item.icon
                        style={{
                            height: '30px',
                            width: '30px',
                            transition: 'transform 0.3s ease, color 0.3s ease',
                        }}
                    />
                    { isNavOpen && <h1 className="text-md text-left pl-3 ">{item.label}</h1>}
                </NavLink>
            ))}
        </div>
    );
}

export default Sidebar;
