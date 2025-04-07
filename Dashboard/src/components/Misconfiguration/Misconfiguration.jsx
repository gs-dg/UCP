import React, { useContext } from 'react';
import ThemeContext from '../../context/ThemeContext';

const Misconfiguration = () => {
    const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`h-[91vh] flex-1 ml-36 overflow-y-auto p-6 md:px-14 transition-all duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <h1 className='flex justify-center items-center h-full text-xl font-bold'>Misconfigurations</h1>
    </div>
  )
}

export default Misconfiguration
