import React, { useState, useContext, useRef, useEffect } from 'react';
import ThemeContext from '../context/ThemeContext';

const AccountFilters = ({ ouList, setShowOperationalUnit }) => {
    const { darkMode, setOu } = useContext(ThemeContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchOrgTerm, setOrgSearchTerm] = useState('');
    const [filteredOUs, setFilteredOUs] = useState([]);
    const [error, setError] = useState('');
    const modalRef = useRef(null);

    // Handle click outside the modal to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowOperationalUnit(false)
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setError('');

        if (value) {
            const filtered = ouList
                .filter((ou) => ou.toLowerCase().startsWith(value.toLowerCase()))
                .slice(0, 3);
            setFilteredOUs(filtered);
        } else {
            setFilteredOUs(ouList.slice(0, 3));
        }
    };

    const handleSelectOU = (ou) => {
        setSearchTerm(ou);
        setOrgSearchTerm(ou);
        setFilteredOUs([]);
        setError('');
    };

    const handleApply = () => {
        if (!searchOrgTerm.trim()) {
            setError('Select one valid Operational Unit');
            setFilteredOUs([]); 
            return;
        }

        setOu(searchOrgTerm);
        setShowOperationalUnit(false)
    };

    
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div
                id="mainContent"
                ref={modalRef}
                className={`${darkMode ? 'border-white bg-gray-300 text-black' : 'border-black bg-gray-200 text-black'} p-6 rounded-lg shadow-lg w-96 h-96 flex flex-col justify-between`}
            > 
                <div>
                    <h2 className="text-lg font-semibold mb-4">Select Filters</h2>
                    <div className="relative">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleInputChange}
                            placeholder="Type to search..."
                            className="w-full p-2 border rounded-md"
                            onClick={handleInputChange}
                        />
                        {filteredOUs.length > 0 && (
                            <ul className="absolute left-0 w-full bg-white border rounded-md shadow-md mt-1 max-h-40 overflow-auto">
                                {filteredOUs.map((ou) => (
                                    <li
                                        key={ou}
                                        onClick={() => handleSelectOU(ou)}
                                        className="p-2 hover:bg-gray-100 cursor-pointer border-b border-gray-400"
                                    >
                                        {ou}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {error && <p className="text-red-600 mt-2">{error}</p>}
                </div>
                <button
                    onClick={handleApply}
                    className="bottom-5 mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                >
                    Apply
                </button>
            </div>
        </div>
    );
};

export default AccountFilters;
