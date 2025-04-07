import React, { useContext, useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ThemeContext from '../../context/ThemeContext';
import ReactECharts from 'echarts-for-react'
import CircleIcon from '@mui/icons-material/Circle';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import TimelineIcon from '@mui/icons-material/Timeline';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import botLogo from '../../../assets/bot-logo.mp4';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const ExceptionItems = () => {
    const { darkMode, isNavOpen, selectedAccount, isBotopen, setIsBotOpen } = useContext(ThemeContext);
    const data = selectedAccount.name == 'Governance' ? useSelector(state => state.exceptionItems.exception) : useSelector(state => state.exceptionItems.exception2);
    const exptn = selectedAccount.name == 'Governance' ? useSelector(state => state.exceptions.exception) : useSelector(state => state.exceptions.exception2);
    const { id } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRules, setFilteredRules] = useState(data);
    const [isChartOpen, setIsChartOpen] = useState(true)
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [status, setStatus] = useState(['Resource Deleted', 'Expired', 'New', 'Active', 'Recertified']);
    const [selectedStatuses, setSelectedStatuses] = useState(new Set(['RESOURCE DELETED', 'EXPIRED', 'NEW', 'ACTIVE', 'RECERTIFIED']));
    const [isRegionOpen, setIsRegionOpen] = useState(false);
    const [region, setRegion] = useState(['Ohio', 'Oregon', 'North Virginia', 'Paris', 'Tokyo', 'London', 'Mumbai', 'North California']);
    const [selectedRegions, setSelectedRegions] = useState(new Set(['OHIO', 'OREGON', 'NORTH VIRGINIA', 'LONDON', 'PARIS', 'TOKYO', 'MUMBAI', 'NORTH CALIFORNIA']));
    const filterRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setIsRegionOpen(false);
                setIsStatusOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const totalPages = 5
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    const handleStatusChange = (event) => {
        const value = event.target.value.toUpperCase();
        setSelectedStatuses(prev => {
            const newSet = new Set(prev);
            if (newSet.has(value)) {
                newSet.delete(value);
            } else {
                newSet.add(value);
            }
            return newSet;
        });
    };

    const handleRegionChange = (event) => {
        const value = event.target.value.toUpperCase();
        setSelectedRegions(prev => {
            const newSet = new Set(prev);
            if (newSet.has(value)) {
                newSet.delete(value);
            } else {
                newSet.add(value);
            }
            return newSet;
        });
    };

    // Update severity state when dropdown closes
    useEffect(() => {
        if (!isRegionOpen) {
            setRegion(Array.from(selectedRegions));
        }
        if (!isStatusOpen) {
            setStatus(Array.from(selectedStatuses));
        }
    }, [isRegionOpen, isStatusOpen]);

    // Filter data based on severity, search term, and region
    useEffect(() => {
        const filterOnSeverityAndSearch = () => {
            let filteredData = data;
            if (status.length > 0) {
                filteredData = filteredData.filter(rule => status.includes(rule.status.toUpperCase()));
            }

            if (region.length > 0) {
                filteredData = filteredData.filter(rule => region.includes(rule.region.toUpperCase()));
            }

            if (searchTerm) {
                filteredData = filteredData.filter(dta => dta.id.toLowerCase().includes(searchTerm));
            }

            // Paginate the filtered data (page size of 10)
            // const startIndex = (currentPage - 1) * 10;
            // const paginatedData = filteredData.slice(startIndex, startIndex + 10);
            setFilteredRules(filteredData);
        };

        filterOnSeverityAndSearch();
    }, [searchTerm, status, region, data]);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
    };

    const configData = exptn.find(dta => dta.id === Number(id))

    const pieChart = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                // name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 0,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    position: 'inside',
                    formatter: '{c}',
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: '#fff'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 14,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: selectedAccount.name == 'Governance' ? [
                    { value: 60, name: 'Complaint', itemStyle: { color: '#008000' } },
                    { value: 13, name: 'Exceptions', itemStyle: { color: '#CFC25B' } },
                    { value: 27, name: 'Non-Compliant', itemStyle: { color: '#FF0000' } },
                ] : [
                    { value: 55, name: 'Complaint', itemStyle: { color: '#008000' } },
                    { value: 21, name: 'Exceptions', itemStyle: { color: '#CFC25B' } },
                    { value: 32, name: 'Non-Compliant', itemStyle: { color: '#FF0000' } }, 
                ],
                top: '15%'
            }
        ]
    };

    const lineChart = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['Approval Date', 'Expiry Date']
        },
        grid: {
            left: '3%',
            top: '14%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1/20', '1/30', '2/10', '2/20']
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: 150,
            interval: 30,
        },
        series: [
            {
                name: 'Approval Date',
                type: 'line',
                data: selectedAccount.name == 'Governance' ? [150, 120, 100, 140] : [135, 110, 120, 145]
            },
            {
                name: 'Expiry Date',
                type: 'line',
                data: selectedAccount.name == 'Governance' ? [20, 50, 77, 10] : [25, 45, 57, 18]
            }
        ]
    };

    const pieChart2 = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                // name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 0,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    position: 'inside',
                    formatter: '{c}',
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: '#fff'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 14,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: selectedAccount.name == 'Governance' ? [
                    { value: 30, name: 'EXPIRED', itemStyle: { color: '#FF0000' } },
                    { value: 25, name: 'NEW', itemStyle: { color: '#F38181' } },
                    { value: 10, name: 'ACTIVE', itemStyle: { color: '#008000' } },
                    { value: 18, name: 'RESOURCE DELETED', itemStyle: { color: '#166186' } },
                    { value: 42, name: 'RECERTIFIED', itemStyle: { color: '#CA1ECD' } },
                ] : [
                    { value: 28, name: 'EXPIRED', itemStyle: { color: '#FF0000' } },
                    { value: 23, name: 'NEW', itemStyle: { color: '#F38181' } },
                    { value: 15, name: 'ACTIVE', itemStyle: { color: '#008000' } },
                    { value: 21, name: 'RESOURCE DELETED', itemStyle: { color: '#166186' } },
                    { value: 36, name: 'RECERTIFIED', itemStyle: { color: '#CA1ECD' } },
                ],
                top: '15%'
            }
        ]
    };

    return (
        <div className={`h-[91.3vh] flex-1 overflow-y-auto ${!isNavOpen ? 'ml-16' : 'ml-48'} px-4 py-2 ${isBotopen ? 'mr-64' : ' md:px-14'} ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
            {/* Header Section */}
            <div className={`flex flex-wrap justify-between mt-3 py-4 border-2 ${darkMode ? 'border-blue-100' : 'border-blue-700'} rounded-t-md px-4 outline-none`}>
                <div className='relative flex gap-2 items-center'>
                    <h3 className='text-lg font-bold mr-4'>{selectedAccount.name} ({selectedAccount.ou}): {selectedAccount.id}</h3>
                </div>
                <div className='relative flex gap-2 items-center'>
                    <h3 className='text-lg font-semibold mr-4'><button>{configData ? configData.name : 'ec2-instance-in-public-subnet'}</button></h3>
                    <input
                        type='text'
                        placeholder='Type to search Exception...'
                        className='text-gray-700 px-3 py-1 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            {/* Overview Section */}
            <div className={`border-b-2 border-l-2 border-r-2 pt-4 pb-6 px-4 ${darkMode ? 'border-blue-100' : 'border-blue-700'} rounded-b-md `}>
                <h3><span className='font-semibold py-1'>Rule Name: </span>{configData.name}</h3>
                <h3><span className='font-semibold py-1'>Severity: </span>{configData.severity}</h3>
                <h3><span className='font-semibold py-1'>Remediation: </span>Enabled</h3>
            </div>

            {/* Graphical Section */}
            <div className={`border-2 ${darkMode ? 'border-blue-100 text-white' : 'border-blue-700 text-black'} mt-6 rounded-md p-4`}>
                {/* Toggle Button */}
                <h3 className='text-sm'>
                    <button className='text-lg' title={isChartOpen ? 'Hide the Visuals' : 'Show the Visuals'}>
                        {isChartOpen ? (
                            <div onClick={() => setIsChartOpen(false)}>
                                <ArrowDropDownOutlinedIcon style={{ width: '35px', height: '35px' }} />
                                Graphical Visuals
                            </div>
                        ) : (
                            <div onClick={() => setIsChartOpen(true)}>
                                <ArrowRightOutlinedIcon style={{ width: '35px', height: '35px' }} />
                                Graphical Visuals
                            </div>
                        )}
                    </button>
                </h3>

                {/* Charts */}
                <div id='charts' className={`flex gap-6 ${isChartOpen ? 'mt-2' : ''}`}>
                    {/* Pie Chart */}
                    <div className={`${isChartOpen ? 'p-3' : ''} rounded-md transition-all duration-300 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} w-1/4`} style={{ backgroundColor: darkMode ? '' : 'rgba(190, 217, 250, .7)' }}>
                        {isChartOpen && (
                            <>
                                <div className={`${darkMode ? 'bg-gray-200' : 'bg-white'} mb-2 rounded-md`}>
                                    <ReactECharts option={pieChart} />
                                </div>
                                <h3 className='pt-2 text-center font-semibold'>Compliance Distribution</h3>
                            </>
                        )}
                    </div>

                    {/* Line Chart */}
                    <div className={`${isChartOpen ? 'p-3' : ''} rounded-md transition-all duration-300 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} w-2/4`} style={{ backgroundColor: darkMode ? '' : 'rgba(190, 217, 250, .7)' }}>
                        {isChartOpen && (
                            <>
                                <div className={`${darkMode ? 'bg-gray-200' : 'bg-white'} mb-2 rounded-md`} >
                                    <ReactECharts option={lineChart} />
                                </div>
                                <h3 className='pt-2 text-center font-semibold'>Resource Timeline</h3>
                            </>
                        )}
                    </div>

                    {/* Exception PieChart */}
                    <div className={`${isChartOpen ? 'p-3' : ''} rounded-md transition-all duration-300 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} w-1/4`} style={{ backgroundColor: darkMode ? '' : 'rgba(190, 217, 250, .7)' }}>
                        {isChartOpen && (
                            <>
                                <div className={`${darkMode ? 'bg-gray-200' : 'bg-white'} mb-2 rounded-md`}>
                                    <ReactECharts option={pieChart2} />
                                </div>
                                <h3 className='pt-2 text-center font-semibold'>Exception Distribution</h3>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <table className={`table-auto w-full border-2 ${darkMode ? 'border-blue-100' : 'border-blue-700'} mt-6`}>
                <thead>
                    <tr className={`border-b-2 ${darkMode ? 'border-blue-100' : 'border-blue-700'} text-center`}>
                        <th className={`px-4 py-2 ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>Resource ID</th>
                        <th className={`px-4 py-2 ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>
                            <div className='relative'>
                                Status
                                <button onClick={() => setIsStatusOpen(prev => !prev)}>
                                    <FilterAltTwoToneIcon className="relative left-2" />
                                </button>
                                {isStatusOpen && (
                                    <ul ref={filterRef} className='absolute z-10 text-black bg-white border border-blue-300 rounded-md mt-3 w-full max-h-36 overflow-y-auto text-left'>
                                        {['Resource Deleted', 'Expired', 'New', 'Active', 'Recertified'].map((item, index) => (
                                            <li
                                                key={index}
                                                className={`px-3 py-1 flex items-center gap-2 font-sans ${index % 2 !== 0 ? 'bg-gray-200' : ''}`}>
                                                <input type="checkbox" name="status" value={item.toUpperCase()}
                                                    checked={selectedStatuses.has(item.toUpperCase())}
                                                    onChange={handleStatusChange}
                                                    className="accent-blue-500"
                                                />
                                                <label className='text-gray-700'> {item} </label>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </th>
                        <th className="px-4 py-2">
                            <div className='relative'>
                                Region
                                <button onClick={() => setIsRegionOpen(prev => !prev)}>
                                    <FilterAltTwoToneIcon className="relative left-2" />
                                </button>
                                {isRegionOpen && (
                                    <ul
                                        ref={filterRef}
                                        className="absolute z-10 text-black bg-white border border-blue-300 rounded-md mt-3 w-full max-h-36 overflow-y-auto text-left"
                                    >
                                        {['Ohio', 'Oregon', 'North Virginia', 'Paris', 'Tokyo', 'London', 'Mumbai', 'North California'].map(
                                            (item, index) => (
                                                <li
                                                    key={index}
                                                    className={`px-3 py-1 flex items-center gap-2 font-sans ${index % 2 !== 0 ? 'bg-gray-200' : ''}`}
                                                >
                                                    <input className="accent-blue-500"
                                                        type="checkbox"
                                                        name="region"
                                                        value={item.toUpperCase()}
                                                        checked={selectedRegions.has(item.toUpperCase())}
                                                        onChange={handleRegionChange}
                                                    />
                                                    <label className="text-gray-700">{item}</label>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                )}
                            </div>
                        </th>
                        <th className={`px-4 py-2 ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>Approval Date</th>
                        <th className={`px-4 py-2 ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>Expiration Date</th>
                        <th className={`px-4 py-2 ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRules.length > 0 ? (
                        filteredRules.map((item) => (
                            <tr key={item.id} className="mb-2">
                                <td className={`px-4 pb-2 text-left ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>
                                    <Link to={``} className="text-blue-500 ">
                                        {item.id}
                                    </Link>
                                </td>
                                <td className={`px-4 pb-2 text-left ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>
                                    <span className={`mr-1 ${item.autoRemediation == 'Available' ? 'pr-4' : 'pl-0.5'}`}>
                                        <CircleIcon style={{
                                            height: '17px', marginRight: '5px', width: '17px',
                                            color: item.status === 'EXPIRED' ? '#FF0000' : item.status === 'NEW' ? '#F38181' :
                                                item.status === 'ACTIVE' ? '#008000' : item.status === 'RESOURCE DELETED' ? '#166186' : '#CA1ECD'
                                        }} />
                                    </span>{item.status}
                                </td>
                                <td className={`px-4 pb-2 text-center ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>{item.region}</td>
                                <td className={`px-4 pb-2 text-center ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>{item.approval}</td>
                                <td className={`px-4 pb-2 text-center ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>{item.expiry}</td>
                                <td className={`px-4 pb-2 text-center ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>
                                    <Tippy content={<div className="custom-tooltip">Rectify Exceptions</div>} className="custom-tippy" interactive={true} placement="bottom" arrow={true}>
                                        <span className="cursor-pointer"><KeyboardDoubleArrowLeftIcon /></span>
                                    </Tippy>
                                    <Tippy content={<div className="custom-tooltip">Notify</div>} className="custom-tippy" placement="bottom">
                                        <span className="cursor-pointer"><AddAlertOutlinedIcon /></span>
                                    </Tippy>
                                    <Tippy content={<div className="custom-tooltip">Exception Timeline</div>} className="custom-tippy" placement="bottom">
                                        <span className="cursor-pointer"><TimelineIcon /></span>
                                    </Tippy>
                                    <Tippy content={<div className="custom-tooltip">Delete Exception</div>} className="custom-tippy" placement="bottom">
                                        <span className="cursor-pointer"><DeleteIcon /></span>
                                    </Tippy>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center py-4">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination Section */}
            <div className={`flex justify-between px-4 border-b-2 border-l-2 border-r-2 py-2 ${darkMode ? 'border-blue-100 text-white' : 'border-blue-700 text-black'}`}>
                <h3>Total Non-Compliant Resources: 27</h3>
                <div className='space-x-2'>
                    {pages.map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            style={{ borderRadius: '50%' }}
                            className={`${currentPage === page
                                ? 'px-3 py-1 bg-blue-500 text-white border-blue-500'
                                : 'px-1 py-1 bg-transparent text-current border-blue-300'}`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>

            {/* Need Help Button */}
            {
                !isBotopen && <div className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg cursor-pointer flex items-center justify-center transition-colors overflow:hidden bg-transparent" >
                    <Tippy content={<span>Need Help ?</span>} interactive={false} placement="top">
                        <div className="relative w-full h-full" onClick={() => setIsBotOpen(true)}>
                            <video
                                src={botLogo}
                                autoPlay
                                loop
                                muted
                                style={{ border: 'none', width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none', borderRadius: '50%' }}
                            />
                        </div>
                    </Tippy>
                </div>
            }
        </div >
    );
}

export default ExceptionItems;
