import React, { useContext, useEffect, useState, useRef } from 'react';
import ReactECharts from 'echarts-for-react'
import ThemeContext from '../../context/ThemeContext';
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import WarningIcon from '@mui/icons-material/Warning';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HistoryIcon from '@mui/icons-material/History';
import RestorePageIcon from '@mui/icons-material/RestorePage';
import { useSelector } from 'react-redux';
import botLogo from '../../../assets/bot-logo.mp4'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const RemediationCenter = () => {
  const { darkMode, isNavOpen, selectedAccount, isBotopen, setIsBotOpen } = useContext(ThemeContext);
  const data = selectedAccount.name == 'Governance' ? useSelector(state => state.remediations.data) : useSelector(state => state.remediations.data2);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRules, setFilteredRules] = useState(data);
  const [isSevrtyOpen, setIsSevrtyOpen] = useState(false);
  const [sevrty, setSevrty] = useState(['Critical', 'High', 'Low', 'Medium', 'Info']);
  const [selectedSeverities, setSelectedSeverities] = useState(new Set(['CRITICAL', 'HIGH', 'LOW', 'INFO', 'MEDIUM']));
  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsSevrtyOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const totalPages = 5;
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handleSeverityChange = (event) => {
    const value = event.target.value.toUpperCase();
    setSelectedSeverities(prev => {
      const newSet = new Set(prev);
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
      return newSet;
    });
  };

  useEffect(() => {
    if (!isSevrtyOpen) {
      setSevrty(Array.from(selectedSeverities));
    }
  }, [isSevrtyOpen]);

  useEffect(() => {
    const filterOnSeverityAndSearch = () => {
      let filteredData = data;
      if (sevrty) {
        filteredData = filteredData.filter(
          rule => sevrty.includes(rule.severity.toUpperCase()));
      }

      if (searchTerm) {
        filteredData = filteredData.filter(
          (dta) => dta.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredRules(filteredData.slice(0, 10));
    };

    filterOnSeverityAndSearch();
  }, [searchTerm, sevrty]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
  };

  const option1 = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
      },
      formatter: function (params) {
        // Create a string to show in the tooltip
        let tooltipContent = '<span style="font-weight: 600;">' + params[0].name + '</span><br>';  // params[0].name will give the category name

        let total = 0;

        params.forEach(function (item) {
          tooltipContent += item.seriesName + ': ' + item.value + '<br>';  // Show series name and value
          total += item.value; // Add the value of each series to the total
        });

        // Append the total value at the end of the tooltip
        tooltipContent += 'Total: ' + total;

        return tooltipContent;
      }
    },
    legend: {},
    grid: {
      top: '12%',
      left: '3%',
      right: '4%',
      bottom: '8%',
      containLabel: true
    },
    yAxis: {
      type: 'value'
    },
    xAxis: {
      type: 'category',
      data: ['Critical', 'High', 'Medium', 'Low', 'Info']
    },
    series: [
      {
        name: 'enabled',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        itemStyle: { color: '#91CC75' },
        data: selectedAccount.name == 'Governance' ? [30, 20, 15, 13, 8] : [27, 18, 16, 10, 13]
      },
      {
        name: 'disabled',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        itemStyle: { color: '#EE6666' },
        data: selectedAccount.name == 'Governance' ? [20, 15, 10, 7, 5] : [15, 13, 11, 8, 3]
      },
      {
        name: 'unavailable',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        // itemStyle: { color: '#73C0DE' },
        data: selectedAccount.name == 'Governance' ? [5, 5, 5, 5, 5] : [5, 6, 5, 5, 4]
      }
    ]
  };

  const option2 = {
    tooltip: {
      trigger: 'item',
      theme: darkMode ? 'dark' : 'light',
      style: {
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif',
        color: darkMode ? '#fff' : '#000',
        backgroundColor: darkMode ? '#333' : '#fff',
      },
      formatter: '{b}: {c} ({d}%)',  // Show name, value, and percentage when hovering
    },
    legend: {
      top: '5%',
      right: '5%',
      orient: 'vertical',
      textStyle: {
        color: '#000',
      },
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['40%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          position: 'inside',
          color: '#fff',
          fontSize: 10,
          formatter: '{c}',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: selectedAccount.name == 'Governance' ? [
          { value: 30, name: 'Critical', itemStyle: { color: '#AA1717' } },
          { value: 20, name: 'High', itemStyle: { color: '#F38181' } },
          { value: 15, name: 'Medium', itemStyle: { color: '#166186' } },
          { value: 13, name: 'Low', itemStyle: { color: '#CA1ECD' } },
          { value: 8, name: 'Info', itemStyle: { color: '#D4D93F' } },
        ] : [
          { value: 32, name: 'Critical', itemStyle: { color: '#AA1717' } },
          { value: 18, name: 'High', itemStyle: { color: '#F38181' } },
          { value: 22, name: 'Medium', itemStyle: { color: '#166186' } },
          { value: 15, name: 'Low', itemStyle: { color: '#CA1ECD' } },
          { value: 7, name: 'Info', itemStyle: { color: '#D4D93F' } },
        ],
      },
    ],
    graphic: [
      {
        type: 'text',
        left: '37%',
        top: 'center',
        style: {
          text: `Total\n${25 + 30 + 20 + 15 + 10}`,  // Total value
          textAlign: 'center',
          textVerticalAlign: 'middle',
          font: 'bold 14px Arial',  // Font style and size
          fill: darkMode ? 'green' : '#f90000',  // Text color based on dark mode
        },
      },
    ],
  };

  
  return (
    <div className={`h-[91.3vh] flex-1 overflow-y-auto ${!isNavOpen ? 'ml-16' : 'ml-48'} px-4 py-2 ${isBotopen ? 'mr-64' : ' md:px-14'} ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      {/* Header Section */}
      <div className={`flex flex-wrap justify-between mt-3 mb-5 py-4 border-2 ${darkMode ? 'border-blue-100' : 'border-blue-700'} rounded-md px-4 hover:outline hover:outline-blue-500`}>
        <div className='relative flex gap-2 items-center'>
          <h3 className='text-lg font-bold mr-4'>{selectedAccount.name} ({selectedAccount.ou}): {selectedAccount.id}</h3>
        </div>
        <div className='flex gap-4 items-center'>
          <div className='relative w-56'>
            <input
              type='text'
              placeholder='Rule name'
              className='text-gray-700 px-3 py-1 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500'
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Available remediations", value: selectedAccount.name == "Governance" ? "40" : "35", color: "border-blue-500", icon: '' },
          { title: "Enabled", value: selectedAccount.name == "Governance" ? "25" : "22", color: "border-green-500", icon: <CheckCircleIcon style={{ color: "green" }} /> },
          { title: "Disabled", value: selectedAccount.name == "Governance" ? "15" : "13", color: "border-red-500", icon: <CancelIcon style={{ color: "red" }} /> },
          { title: "Unavailable", value: selectedAccount.name == "Governance" ? "5" : "6", color: "border-yellow-500", icon: <WarningIcon style={{ color: "#f18c0f" }} /> },
        ].map((item, index) => (
          <div
            key={index}
            className={`p-3 rounded-t-md border-b-4 transition-transform duration-300 transform hover:scale-105 hover:shadow-md hover:translate-y-1 ${item.color} ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
          >
            <div className="flex justify-between">
              <span>{item.title}</span>
              {item.icon}
            </div>
            <p className="text-md">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
        {[
          { title: "Remediation Posture", option: option1, key: "chart1" },
          { title: "Remediation enabled by severity", option: option2, key: "chart2" },
        ].map((chart, index) => (
          <div key={index} className={`p-3 rounded-md transition-all duration-300 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`} style={{ backgroundColor: darkMode ? '' : 'rgba(190, 217, 250, .7)' }}>
            <div className='flex justify-between mb-2'>
              <h3
                className='font-semibold'>{chart.title}
                <span>
                  <Tippy interactive={false} placement="top" arrow={false} className='info-tippy' content={<span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias impedit dolorum fugiat eveniet ut perferendis a consectetur vero minima, voluptates veritatis architecto pariatur iste molestiae, est tempore magni, recusandae soluta.</span>}>
                    <InfoOutlinedIcon className="focus:outline-none" style={{ height: '16px', width: '16px', marginLeft: '5px' }} />
                  </Tippy>
                </span>
              </h3>
            </div>
            <div className={`${darkMode ? 'bg-gray-200' : 'bg-white'} rounded-md`} >
              <div className={`relative h-72 w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d]`}>
                <div className="absolute inset-0 w-full h-full transition-all duration-500 [backface-visibility:hidden]" style={{ transform: "rotateY(0deg)" }}>
                  <ReactECharts option={chart.option} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className={`table-auto w-full border-2 ${darkMode ? 'border-blue-100' : 'border-blue-700'} mt-6`}>
          <thead>
            <tr className={`border-b-2 ${darkMode ? 'border-blue-100' : 'border-blue-700'} text-center`}>
              <th className={`px-4 py-2 ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>Rule Name</th>
              <th className={`px-4 py-2 ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>Remediation Status</th>
              {/* <th className={`px-4 py-2 ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>Remediation Disabled</th> */}
              <th className={`px-4 py-2 ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>Applicable Resources</th>
              <th className="px-4 py-2">
                <div className='relative'>
                  Severity
                  <button onClick={() => setIsSevrtyOpen(prev => !prev)}>
                    <FilterAltTwoToneIcon className="relative left-2" />
                  </button>
                  {isSevrtyOpen && (
                    <ul ref={filterRef} className='absolute z-10 text-black bg-white border border-blue-300 rounded-md mt-3 w-full max-h-36 overflow-y-auto text-left'>
                      {['Critical', 'High', 'Low', 'Medium', 'Info'].map((item, index) => (
                        <li
                          key={index}
                          className={`px-3 py-1 flex items-center gap-2 font-sans ${index % 2 !== 0 ? 'bg-gray-200' : ''}`}
                        >
                          <input type="checkbox" name="severity" value={item.toUpperCase()}
                            checked={selectedSeverities.has(item.toUpperCase())}
                            onChange={handleSeverityChange}
                            className="accent-blue-500"
                          />
                          <label className='text-gray-700'> {item}</label>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </th>
              <th className={`px-4 py-2 ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRules.map((item) => (
              <tr key={item.id} className="mb-2">
                <td className={`px-4 pb-2 text-left ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>{item.name}</td>
                <td className={`px-4 pb-1 text-center ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>{item.status}</td>
                <td className={`px-4 py-2 text-center ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>
                  {item.resources &&
                    item.resources.split(',').map((resource, index) => (
                      <div key={index}>{resource.trim()}</div>
                    ))}
                </td>
                <td className="my-1 text-center">
                  <button className='px-2 pb-1 rounded-lg w-20 text-white' style={{ backgroundColor: item.severity === 'CRITICAL' ? '#CF171F' : item.severity === 'HIGH' ? '#F47721' : item.severity === 'LOW' ? '#C1D72E' : item.severity === 'MEDIUM' ? '#FFC600' : '#3498DB' }}>
                    {item.severity}
                  </button>
                </td>
                <td className={`px-4 pb-2 text-center ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>
                  <Tippy content={<div className="custom-tooltip">Opt-in</div>} className="custom-tippy" interactive={true} placement="bottom" arrow={true}>
                    <span className="cursor-pointer"><LoginIcon /></span>
                  </Tippy>
                  <Tippy content={<div className="custom-tooltip">Opt-out</div>} className="custom-tippy" placement="bottom">
                    <span className="cursor-pointer"><LogoutIcon /></span>
                  </Tippy>
                  <Tippy content={<div className="custom-tooltip">Remediation history</div>} className="custom-tippy" placement="bottom">
                    <span className="cursor-pointer"><HistoryIcon /></span>
                  </Tippy>
                  <Tippy content={<div className="custom-tooltip">Remediation log</div>} className="custom-tippy" placement="bottom">
                    <span className="cursor-pointer"><RestorePageIcon /></span>
                  </Tippy>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Section */}
        <div className={`flex justify-between px-4 border-b-2 border-l-2 border-r-2 py-2 ${darkMode ? 'border-blue-100 text-white' : 'border-blue-700 text-black'}`}>
          <h3>Total Available Remediations: 27</h3>
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
        {!isBotopen && <div className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg cursor-pointer flex items-center justify-center transition-colors overflow:hidden bg-transparent" >
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
        </div>}

      </div>
    </div>
  );
};

export default RemediationCenter;
