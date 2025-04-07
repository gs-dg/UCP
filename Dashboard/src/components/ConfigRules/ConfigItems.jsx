import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactECharts from 'echarts-for-react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import './tooltipStyles.css'
import ThemeContext from '../../context/ThemeContext';
import ConfigItemsFilter from '../../utils/ConfigItemsFilter';
import CircleIcon from '@mui/icons-material/Circle';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
import botLogo from '../../../assets/bot-logo.mp4'


const ConfigItems = () => {
  const { darkMode, isNavOpen, selectedAccount, isBotopen, setIsBotOpen } = useContext(ThemeContext);
  const { id } = useParams()
  const configs = selectedAccount.name == 'Governance' ? useSelector(state => state.configItems.configs) : useSelector(state => state.configItems.configs2)
  const data = useSelector(state => state.tableItems.data);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRules, setFilteredRules] = useState(configs);
  const [isChartOpen, setIsChartOpen] = useState(true)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [compStatus, setCompStatus] = useState('')
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [region, setRegion] = useState(['Ohio', 'Oregon', 'North Virginia', 'Paris', 'Tokyo', 'London', 'Mumbai', 'North California']);
  const [selectedRegions, setSelectedRegions] = useState(new Set(['OHIO', 'OREGON', 'NORTH VIRGINIA', 'LONDON', 'PARIS', 'TOKYO', 'MUMBAI', 'NORTH CALIFORNIA']));
  const [isComplianceOpen, setIsComplianceOpen] = useState(false);
  const [compliance, setCompliance] = useState(['Compliant', 'Non-Compliant']);
  const [selectedComplianes, setSelectedComplianes] = useState(new Set(['COMPLIANT', 'NON-COMPLIANT']));
  const [isAnnotationOpen, setIsAnnotationOpen] = useState(false);
  const [annotation, setAnnotation] = useState(['Instance is launched in a private subnet', 'This resource is an exception', 'Instance is launched in a public subnet', 'Instance is in stopped state']);
  const [selectedAnnotations, setSelectedAnnotations] = useState(new Set(['INSTANCE IS LAUNCHED IN A PRIVATE SUBNET', 'THIS RESOURCE IS AN EXCEPTION', 'INSTANCE IS LAUNCHED IN A PUBLIC SUBNET', 'INSTANCE IS IN STOPPED STATE']));
  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsAnnotationOpen(false);
        setIsComplianceOpen(false);
        setIsRegionOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const handleComplianceChange = (event) => {
    const value = event.target.value.toUpperCase();
    setSelectedComplianes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
      return newSet;
    });
  };

  const handleAnnotationChange = (event) => {
    const value = event.target.value.toUpperCase();
    setSelectedAnnotations(prev => {
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

    if (!isAnnotationOpen) {
      setAnnotation(Array.from(selectedAnnotations));
    }
    if (!isComplianceOpen) {
      setCompliance(Array.from(selectedComplianes));
    }
  }, [isAnnotationOpen, isComplianceOpen, isRegionOpen]);

  // useEffect to filter based on compStatus and search term
  useEffect(() => {
    const filterOncompStatusAndSearch = () => {
      let filteredData = configs;
      if (compStatus) {
        filteredData = filteredData.filter(
          (confg) => confg.compliance.toLowerCase() === compStatus.toLowerCase()
        );
      }

      if (annotation) {
        filteredData = filteredData.filter(
          (confg) => annotation.includes(confg.annotation.toUpperCase())
        );
      }

      if (region) {
        filteredData = filteredData.filter(
          (confg) => region.includes(confg.region.toUpperCase())
        );
      }

      if (compliance) {
        filteredData = filteredData.filter(
          (confg) => compliance.includes(confg.compliance.toUpperCase())
        );
      }

      if (searchTerm) {
        filteredData = filteredData.filter(
          (confg) => confg.name.toString().includes(searchTerm)
        );
      }

      setFilteredRules(filteredData.slice(0, 9));
    };

    filterOncompStatusAndSearch();
  }, [compStatus, searchTerm, annotation, region, compliance]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
  };

  const configData = data.find(dta => dta.id === Number(id))

  const totalPages = 5;
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

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
          { value: 50, name: 'Complaint', itemStyle: { color: '#008000' } },
          { value: 15, name: 'Exceptions', itemStyle: { color: '#CFC25B' } },
          { value: 22, name: 'Non-Compliant', itemStyle: { color: '#FF0000' } },
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
      data: ['Compliant', 'Non-Compliant', 'Exception']
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
        name: 'Compliant',
        type: 'line',
        data: selectedAccount.name == 'Governance' ? [150, 120, 100, 140] : [140, 150, 90, 120],
      },
      {
        name: 'Non-Compliant',
        type: 'line',
        data: selectedAccount.name == 'Governance' ? [20, 50, 77, 10] : [28, 45, 25, 62], 
      },
      {
        name: 'Exception',
        type: 'line',
        data: selectedAccount.name == 'Governance' ? [30, 20, 25, 50] : [20, 35, 23, 42],
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
          { value: 25, name: 'EXPIRED', itemStyle: { color: '#FF0000' } },
          { value: 32, name: 'NEW', itemStyle: { color: '#F38181' } },
          { value: 16, name: 'ACTIVE', itemStyle: { color: '#008000' } },
          { value: 12, name: 'RESOURCE DELETED', itemStyle: { color: '#166186' } },
          { value: 38, name: 'RECERTIFIED', itemStyle: { color: '#CA1ECD' } },
        ],
        top: '15%'
      }
    ]
  };

  const compChart = {
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['155%', '185%'],
        center: isNavOpen && isBotopen ? ['80%', '92%'] :isNavOpen ? ['86%', '92%'] : isBotopen ? ['84%', '92%'] : ['87%', '92%'],
        startAngle: 200,
        endAngle: 340,
        labelLine: {
          show: false
        },
        data: [
          { value: 73, itemStyle: { color: 'rgb(59 130 246)' } },
          { value: 27, itemStyle: { color: '#AAACAD' } },
        ]
      }
    ],
    graphic: [
      {
        type: 'text',
        left: isNavOpen && isBotopen ? '70%' : isNavOpen ? '79%' : isBotopen ? '76%' : '81%',
        top: '60%',
        style: {
          text: selectedAccount.name == "Governance" ? `73%` : `71%`, 
          textAlign: 'center',
          textVerticalAlign: 'middle',
          font: '12px Arial',  
          fill: darkMode ? 'white' : 'black', 
        },
      },
    ],
  };


  return (
    <div className={`h-[91.2vh] flex-1 overflow-y-auto ${!isNavOpen ? 'ml-16' : 'ml-48'} px-4 py-2 ${isBotopen ? 'mr-64' : ' md:px-14'} ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      {/* Header Section */}
      <div className={`flex flex-wrap justify-between mt-3 py-4 border-2 ${darkMode ? 'border-blue-100' : 'border-blue-700'} rounded-t-md px-4 hover:outline hover:outline-blue-500`}>
        <div className='relative flex gap-2 items-center'>
          <h3 className='text-lg font-bold mr-4'>{selectedAccount.name} ({selectedAccount.ou}): {selectedAccount.id}</h3>
        </div>
        <div className='relative flex gap-2 items-center'>
          <h3 className='text-lg font-bold mr-4'><button onClick={() => setCompStatus('')}>{configData ? configData.name : 'ec2-instance-in-public-subnet'}</button></h3>
          <input
            type='text'
            placeholder='Type to search Rule...'
            className='text-gray-700 px-3 py-1 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-indigo-500'
            value={searchTerm}
            onChange={handleSearch}
          />
          {/* <TuneIcon className='cursor-pointer' style={{ width: '30px', height: '30px' }} onClick={() => setIsFilterOpen(true)} /> */}
        </div>
      </div>

      {/* Overview Section */}
      <div className={`border-b-2 border-l-2 border-r-2 pt-4 pb-8 px-4 ${darkMode ? 'border-blue-100' : 'border-blue-700'} rounded-b-md `}>
        <h1 ></h1>
        <h3><span className='font-semibold'>Description: </span>Checks of an EC2 instance is launched in the public subnet. Marks an EC2 instance NON_COMPLIANT if the instance is launched in the public subnet. </h3>
        <div className='flex flex-wrap justify-between pt-1'>
          <div>
            <p className='pb-1'><span className='font-semibold'>Severity</span> : {configData ? configData.severity : 'LOW'}</p>
            <p><span className='font-semibold'>Resources monitored</span> : {configData ? configData.name.split('-')[0].toUpperCase() : 'EC2'}</p>
          </div>
          <div>
            <p className='pb-1'><span className='font-semibold'>Auto-remediation</span> : {configData ? (configData.autoRemediation == 'Available' ? 'Enabled' : 'Disabled') : 'Enabled'}</p>
            <p><span className='font-semibold'>Total resource exceptions</span> : 13</p>
          </div>
          <div>
            <p className='pb-1'><span className='font-semibold'>Auto-remediation action</span> : The noncompliant instance is stopped.</p>
            <div className='flex justify-between'>
              <button style={{ padding: '1px 18px 3px 18px' }} className='text-white rounded-xl bg-blue-600'>Re-evaluate</button>
              <button style={{ padding: '1px 18px 3px 18px' }} className='text-white rounded-xl bg-blue-600'>Delete results</button>
            </div>
          </div>
        </div>
      </div>

      {/* Graphical Section */}
      <div className={`border-2 ${darkMode ? 'border-blue-100 text-white' : 'border-blue-700 text-black'} mt-6 rounded-md p-4`}>
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Total Resources", value: selectedAccount.name == "Governance" ? "100" : "110", color: "border-yellow-500" },
            { title: "Non-compliant", value: selectedAccount.name == "Governance" ? "27" : "32", color: "border-red-500" },
            { title: "Compliant", value: selectedAccount.name == "Governance" ? "73" : "78", color: "border-green-500" },
            { title: "Compliance", value: selectedAccount.name == "Governance" ? "73%" : "71%", color: "border-blue-500" },
          ].map((item, index) => (
            <div
              key={index}
              className={`px-3 pt-3 pb-6 flex justify-between rounded-t-md border-b-4 transition-transform duration-300 transform hover:scale-105 hover:shadow-md hover:translate-y-1 ${item.color} ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} cursor-pointer`}
              onClick={() => {
                if (item.title === 'Total Resources') {
                  setCompliance(['COMPLIANT', 'NON-COMPLIANT']);
                  setSelectedComplianes(new Set(['COMPLIANT', 'NON-COMPLIANT']));
                } else if (item.title === 'Compliant') {
                  setCompliance(['COMPLIANT']);
                  setSelectedComplianes(new Set(['COMPLIANT']));
                } else if (item.title === 'Non-compliant') {
                  setCompliance(['NON-COMPLIANT']);
                  setSelectedComplianes(new Set(['NON-COMPLIANT']));
                }
              }}
            >
              <p className='font-semibold'>{item.title}</p>
              {item.title !== 'Compliance' && <p className="text-md">{item.value}</p>}
              {item.title === 'Compliance' && (
                <div style={{ width: '100%', height: '100%' }}> {/* Set a fixed height */}
                  <ReactECharts option={compChart} style={{ width: '100%', height: '100%' }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Toggle Button */}
        <h3 className='mt-4 text-sm'>
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
                <h3 className='pt-2 text-center font-semibold'>Compliance Timeline</h3>
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
            <th className={`px-4 py-2 ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>Name</th>
            <th className={`px-4 py-2 ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>ID</th>
            <th className={`px-4 py-2 ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>
              <div className='relative'>
                Region
                <button onClick={() => setIsRegionOpen(prev => !prev)}>
                  {/* className="relative left-8 sm:left-4 md:left-4 lg:left-5 xl:left-8 */}
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
            <th className={`px-4 py-2 ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>
              <div className='relative'>
                Compliance
                <button onClick={() => setIsComplianceOpen(prev => !prev)}>
                  {/* className="relative left-8 sm:left-4 md:left-4 lg:left-4 xl:left-6" */}
                  <FilterAltTwoToneIcon className="relative left-2" />
                </button>
                {isComplianceOpen && (
                  <ul
                    ref={filterRef}
                    className="absolute z-10 text-black bg-white border border-blue-300 rounded-md mt-3 w-full max-h-36 overflow-y-auto text-left"
                  >
                    {['Compliant', 'Non-Compliant'].map((item, index) => (
                      <li
                        key={index}
                        className={`px-3 py-1 flex items-center gap-2 font-sans ${index % 2 !== 0 ? 'bg-gray-200' : ''}`}
                      >
                        <input
                          type="checkbox"
                          name="compliance"
                          value={item.toUpperCase()}
                          checked={selectedComplianes.has(item.toUpperCase())}
                          onChange={handleComplianceChange}
                          className="accent-blue-500"
                        />
                        <label className="text-gray-700">{item}</label>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </th>
            <th className={`px-4 py-2 ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>
              <div className='relative'>
                Annotation
                <button onClick={() => setIsAnnotationOpen(prev => !prev)}>
                  {/* className="relative left-8 sm:left-4 md:left-4 lg:left-12 xl:left-24 */}
                  <FilterAltTwoToneIcon className="relative left-4" />
                </button>
                {isAnnotationOpen && (
                  <ul
                    ref={filterRef}
                    className="absolute z-10 text-black bg-white border border-blue-300 rounded-md mt-3 w-full max-h-36 overflow-y-auto text-left"
                  >
                    {[
                      'Instance is launched in a private subnet',
                      'This resource is an exception',
                      'Instance is launched in a public subnet',
                      'Instance is in stopped state'
                    ].map((item, index) => (
                      <li
                        key={index}
                        className={`px-3 py-1 flex items-center gap-2 font-sans ${index % 2 !== 0 ? 'bg-gray-200' : ''}`}
                      >
                        <input
                          type="checkbox"
                          name="annotation"
                          value={item.toUpperCase()}
                          checked={selectedAnnotations.has(item.toUpperCase())}
                          onChange={handleAnnotationChange}
                          className="accent-blue-500"
                        />
                        <label className="text-gray-700">{item}</label>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRules.map((item) => (
            <tr key={item.id} className="mb-2">
              <td className={`px-4 pb-2 pt-0.5 text-left ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>{item.name}</td>
              <td className={`px-4 pb-2 pt-0.5 text-center ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>{item.id}</td>
              <td className={`px-4 pb-2 pt-0.5 text-center ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>{item.region}</td>
              <td className={`px-4 pb-2 pt-0.5 text-left ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}><span className={`mr-1 ${item.compliance == 'COMPLIANT' ? '': ''}`}><CircleIcon style={{height:'17px', marginRight: '5px', width:'17px', color: item.compliance == 'COMPLIANT' ? 'green' : '#CF171F'}}/></span>{item.compliance}</td>
              <td className={`px-4 pb-2 pt-0.5 text-center ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>{item.annotation}</td>
              <td className={`px-4 pb-2 pt-0.5 text-center ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>
                <Tippy content={<div className="custom-tooltip">Resource Timeline</div>} className="custom-tippy" interactive={true} placement="bottom" arrow={true}><span className="cursor-pointer"><TroubleshootIcon /></span></Tippy>
                <Tippy content={<div className="custom-tooltip">Notify</div>} className="custom-tippy" placement="bottom"><span className="cursor-pointer"><AddAlertOutlinedIcon /></span></Tippy>
                <Tippy content={<div className="custom-tooltip">Request Exception</div>} className="custom-tippy" placement="bottom"><span className="cursor-pointer"><AssignmentOutlinedIcon /></span></Tippy>
                <Tippy content={<div className="custom-tooltip">Remediate Resource</div>} className="custom-tippy" placement="bottom"><span className="cursor-pointer"><LocalHospitalOutlinedIcon /></span></Tippy>
                <Tippy content={<div className="custom-tooltip">Report Incorrect Compliance</div>} className="custom-tippy" placement="bottom"><span className="cursor-pointer"><ReportProblemOutlinedIcon /></span></Tippy>
              </td>
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
          ))}</div>
      </div>

      {isFilterOpen && <ConfigItemsFilter complianceList={['Compliant', 'Non-Compliant']} setCompStatus={setCompStatus} setIsFilterOpen={setIsFilterOpen} />}

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

export default ConfigItems
