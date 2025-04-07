import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import ReactECharts from 'echarts-for-react'
import ThemeContext from '../../context/ThemeContext';
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useSelector } from 'react-redux';
import botLogo from '../../../assets/bot-logo.mp4'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const Exceptions = () => {
  const { darkMode, isNavOpen, selectedAccount, isBotopen, setIsBotOpen } = useContext(ThemeContext);
  const data = selectedAccount.name == 'Governance' ? useSelector(state => state.exceptions.exception) : useSelector(state => state.exceptions.exception2);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRules, setFilteredRules] = useState(data);
  const [isSevrtyOpen, setIsSevrtyOpen] = useState(false);
  const [sevrty, setSevrty] = useState(['Critical', 'High', 'Low', 'Medium', 'Info']);
  const [selectedSeverities, setSelectedSeverities] = useState(new Set(['CRITICAL', 'HIGH', 'LOW', 'INFO', 'MEDIUM']));
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [category, setCategory] = useState(['Network Security', 'IAM', 'Data Protection']);
  const [selectedCategoryes, setSelectedCategoryes] = useState(new Set(['NETWORK SECURITY', 'IAM', 'DATA PROTECTION']));
  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsSevrtyOpen(false);
        setIsCategoryOpen(false);
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

  const handleCategoryChange = (event) => {
    const value = event.target.value.toUpperCase();
    setSelectedCategoryes(prev => {
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
    if (!isSevrtyOpen) {
      setSevrty(Array.from(selectedSeverities));
    }

    if (!isCategoryOpen) {
      setCategory(Array.from(selectedCategoryes));
    }
  }, [isSevrtyOpen, isCategoryOpen]);

  // useEffect to filter based on severity and search term
  useEffect(() => {
    const filterOnSeverityAndSearch = () => {
      let filteredData = data;
      if (sevrty) {
        filteredData = filteredData.filter(
          rule => sevrty.includes(rule.severity.toUpperCase()));
      }

      if (category) {
        filteredData = filteredData.filter(
          rule => category.includes(rule.category.toUpperCase()));
      }

      if (searchTerm) {
        filteredData = filteredData.filter(
          (dta) => dta.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredRules(filteredData.slice(0, 10));
    };

    filterOnSeverityAndSearch();
  }, [searchTerm, sevrty, category]);


  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
  };

  const option1 = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999',
        },
      },
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    grid: {
      left: '30%',
      right: '10%',
      bottom: '15%',
      top: '10%',
    },
    legend: {
      show: false,
    },
    yAxis: [
      {
        type: 'category',
        data: [
          'rds-single-az',
          's3-bucket-lifecycle-policy',
          'iam-idp-compliance',
          'ec2-instance-in-public-subnet',
          'ec2-rogue-emi',
        ],
        axisPointer: {
          type: 'shadow',
        },
        axisLabel: {
          color: 'black'
        }
      },
    ],
    xAxis: [
      {
        type: 'value',
        min: 0,
        max: 50,
        interval: 10,
        axisLabel: {
          color: 'black'
        }
      },
    ],
    series: [
      {
        name: 'Compliance',
        type: 'bar',
        data: selectedAccount.name == 'Governance' ? [45, 27, 17, 10, 4].reverse() : [47, 35, 25, 9, 6].reverse(),
        itemStyle: {
          color: function (params) {
            const colors = ['#CA1ECD', '#D4D93F', '#166186', '#F38181', '#AA1717'];
            return colors[params.dataIndex];
          },
          borderRadius: [0, 10, 10, 0],
        },
        label: {
          show: true,
          position: 'inside',
          color: '#fff',
          fontSize: 12,
        },
      },
    ],
  }

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
          { value: 25, name: 'Critical', itemStyle: { color: '#AA1717' } },
          { value: 30, name: 'High', itemStyle: { color: '#F38181' } },
          { value: 20, name: 'Medium', itemStyle: { color: '#166186' } },
          { value: 15, name: 'Low', itemStyle: { color: '#CA1ECD' } },
          { value: 10, name: 'Info', itemStyle: { color: '#D4D93F' } },
        ] : [
          { value: 30, name: 'Critical', itemStyle: { color: '#AA1717' } },
          { value: 24, name: 'High', itemStyle: { color: '#F38181' } },
          { value: 17, name: 'Medium', itemStyle: { color: '#166186' } },
          { value: 12, name: 'Low', itemStyle: { color: '#CA1ECD' } },
          { value: 21, name: 'Info', itemStyle: { color: '#D4D93F' } },
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
          { title: "Total Exception", value: selectedAccount.name == "Governance" ? "235" : "250", color: "border-blue-500", icon: '' },
          { title: "Active", value: selectedAccount.name == "Governance" ? "180" : "200", color: "border-green-500", icon: <CheckCircleIcon style={{ color: "green" }} /> },
          { title: "Expired", value: selectedAccount.name == "Governance" ? "40" : "35", color: "border-red-500", icon: <WarningIcon style={{ color: "red" }} /> },
          { title: "About to Expire", value: "15", color: "border-yellow-500", icon: '' },
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
          { title: "Top 5 config rule with exceptions count", option: option1, key: "chart1" },
          { title: "Exception count by severity", option: option2, key: "chart2" },
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
      <table className={`table-auto w-full border-2 ${darkMode ? 'border-blue-100' : 'border-blue-700'} mt-6`}>
        <thead>
          <tr className={`border-b-2 ${darkMode ? 'border-blue-100' : 'border-blue-700'} text-center`}>
            <th className={`px-4 py-2 ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>Rule Name</th>
            <th className={`px-4 py-2 ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>Exceptions</th>
            <th className={`px-4 py-2 ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>Applicable Resources</th>
            <th className={`px-4 py-2 ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>
              <div className='relative'>
                Category
                <button onClick={() => setIsCategoryOpen(prev => !prev)}>
                  {/*  className="relative left-8 sm:left-4 md:left-4 lg:left-5 xl:left-7" */}
                  <FilterAltTwoToneIcon className="relative left-2" />
                </button>
                {isCategoryOpen && (
                  <ul ref={filterRef} className='absolute z-10 text-black bg-white border border-blue-300 rounded-md mt-3 w-full max-h-36 overflow-y-auto text-left'>
                    {['Network Security', 'IAM', 'Data Protection'].map((item, index) => (
                      <li
                        key={index}
                        className={`px-3 py-1 flex items-center gap-2 font-sans ${index % 2 !== 0 ? 'bg-gray-200' : ''}`}>
                        <input type="checkbox" name="category" value={item.toUpperCase()}
                          checked={selectedCategoryes.has(item.toUpperCase())}
                          onChange={handleCategoryChange}
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
                Severity
                <button onClick={() => setIsSevrtyOpen(prev => !prev)}>
                  {/* className="relative left-6 sm:left-2 md:left-2 lg:left-4 xl:left-6" */}
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
          </tr>
        </thead>
        <tbody>
          {filteredRules.map((item) => (
            <tr key={item.id} className="mb-2">
              <td className={`px-4 pb-2 text-left ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>
                <Link to={`/exceptions/rule/${item.id}`} className="text-blue-500 ">
                  {item.name}
                </Link>
              </td>
              <td className={`px-4 pb-2 text-center ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>{item.exceptions}</td>
              <td className={`px-4 py-2 text-center ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>
                {item.resources &&
                  item.resources.split(',').map((resource, index) => (
                    <div key={index}>{resource.trim()}</div>
                  ))}
              </td>
              <td className={`px-4 pb-2 text-center ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>{item.category}</td>
              <td className="my-1 text-center"><button className='px-2 pb-1 rounded-lg w-20 text-white' style={{ backgroundColor: item.severity === 'CRITICAL' ? '#CF171F' : item.severity === 'HIGH' ? '#F47721' : item.severity === 'LOW' ? '#C1D72E' : item.severity === 'MEDIUM' ? '#FFC80B' : item.severity === 'INFO' ? '#33A02C' : '' }}>{item.severity}</button></td>
            </tr>
          ))}
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
  )
}

export default Exceptions
