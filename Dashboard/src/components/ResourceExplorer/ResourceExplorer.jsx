import React, { useContext, useEffect, useState, useRef } from 'react';
import * as echarts from 'echarts';
import SyncIcon from '@mui/icons-material/Sync';
import ThemeContext from '../../context/ThemeContext';
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
import CircleIcon from '@mui/icons-material/Circle';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useSelector } from 'react-redux';
import botLogo from '../../../assets/bot-logo.mp4'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const ResourceExplorer = () => {
  const { darkMode, isNavOpen, selectedAccount, isBotopen, setIsBotOpen } = useContext(ThemeContext);
  const resource = selectedAccount.name == 'Governance' ? useSelector(state => state.resource.resources) : useSelector(state => state.resource.resources2);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRules, setFilteredRules] = useState(resource);
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [region, setRegion] = useState(['us-east-1', 'ap-south-1', 'eu-west-1', 'eu-north-1', 'global']);
  const [selectedRegions, setSelectedRegions] = useState(new Set(['US-EAST-1', 'AP-SOUTH-1', 'EU-WEST-1', 'EU-NORTH-1', 'GLOBAL']));
  const [isComplianceOpen, setIsComplianceOpen] = useState(false);
  const [compliance, setCompliance] = useState(['Compliant', 'Non-Compliant']);
  const [selectedComplianes, setSelectedComplianes] = useState(new Set(['COMPLIANT', 'NON-COMPLIANT']));
  const [type, setType] = useState(['IAM', 'S3', 'VPC', 'EC2', 'Config'])
  const filterRef = useRef(null);
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsRegionOpen(false);
        setIsComplianceOpen(false);
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

  const handleRegionChange = (event) => {
    const value = event.target.value.toUpperCase();
    setSelectedRegions((prev) => {
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
    setSelectedComplianes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
      return newSet;
    });
  };

  const filterTableByType = (type) => {
    const filteredData = resource.filter(item => item.type === type);
    setFilteredRules(filteredData.slice(0, 10));
  };

  useEffect(() => {
    if (!isComplianceOpen) {
      setCompliance(Array.from(selectedComplianes));
    }

    if (!isRegionOpen) {
      setRegion(Array.from(selectedRegions));
    }
  }, [isComplianceOpen, isRegionOpen]);

  useEffect(() => {
    if (chartRef1.current) {
      const chartInstance = echarts.init(chartRef1.current);
      chartInstance.setOption(option1);

      // Chart click event for Region selection
      chartInstance.on('click', (params) => {
        const selectedRegon = params.name.toLowerCase(); 
        if (selectedRegon)  {
          setRegion([selectedRegon.toUpperCase()])
          setSelectedRegions(prev => {
            const newSet = new Set(prev);
            if (newSet.has(selectedRegon)) {
              newSet.delete(selectedRegon);
            } else {
              newSet.add(selectedRegon);
            }
            return newSet;
          });
        }
      });
    }

    if (chartRef2.current) {
      const chartInstance = echarts.init(chartRef2.current);
      chartInstance.setOption(option2);

      // Chart click event for Type selection
      chartInstance.on('click', (params) => {
        const selectedType = params.name;
        setType(selectedType);
      });
    }

    const filterOnSeverityAndSearch = () => {
      let filteredData = resource;
      if (region) {
        filteredData = filteredData.filter(
          rule => region.includes(rule.region.toUpperCase()));
      }
      if (compliance) {
        filteredData = filteredData.filter(
          rule => compliance.includes(rule.compliance.toUpperCase()));
      }

      if (type) {
        filteredData = filteredData.filter(
          rule => type.includes(rule.type));
      }

      if (searchTerm) {
        filteredData = filteredData.filter(
          (dta) => dta.resource.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredRules(filteredData.slice(0, 10));
    };

    filterOnSeverityAndSearch();

  }, [searchTerm, compliance, region, resource, type]);

  const handleRefreshRegion = () => {
    setRegion(['US-EAST-1', 'AP-SOUTH-1', 'EU-WEST-1', 'EU-NORTH-1', 'GLOBAL']);
    setSelectedRegions(new Set(['US-EAST-1', 'AP-SOUTH-1', 'EU-WEST-1', 'EU-NORTH-1', 'GLOBAL']));
  };

  const handleRefreshType = () => {
    setType(['IAM', 'S3', 'VPC', 'EC2', 'Config']);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
  };

  const option1 = {
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
        name: 'Resource',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['40%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: '#fff',
          borderWidth: 0,
        },
        label: {
          show: true,
          position: 'inside',
          color: '#fff',
          fontSize: 12,
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
          { value: 13, name: 'ap-south-1' },
          { value: 20, name: 'us-east-1' },
          { value: 10, name: 'eu-west-1' },
          { value: 10, name: 'eu-north-1' },
          { value: 15, name: 'global' }
        ] : [
          { value: 15, name: 'ap-south-1' },
          { value: 12, name: 'us-east-1' },
          { value: 21, name: 'eu-west-1' },
          { value: 21, name: 'eu-north-1' },
          { value: 14, name: 'global' }
        ]
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
          borderWidth: 0,
        },
        label: {
          show: true,
          position: 'inside',
          color: '#fff',
          fontSize: 12,
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
          { value: 30, name: 'IAM' },
          { value: 20, name: 'S3' },
          { value: 15, name: 'EC2' },
          { value: 13, name: 'VPC' },
          { value: 8, name: 'Config' },
        ] : [
          { value: 32, name: 'IAM', itemStyle: { color: '#AA1717' } },
          { value: 24, name: 'EC2', itemStyle: { color: '#F38181' } },
          { value: 12, name: 'S3', itemStyle: { color: '#166186' } },
          { value: 18, name: 'VPC', itemStyle: { color: '#CA1ECD' } },
          { value: 9, name: 'Config', itemStyle: { color: '#D4D93F' } },
        ],
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
              placeholder='Resource Id'
              className='text-gray-700 px-3 py-1 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500'
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
        {[
          { title: "Distribution of resrources by Region", option: option1, key: "chart1" },
          { title: "Distribution of resrources by Type", option: option2, key: "chart2" },
        ].map((chart, index) => (
          <div key={index} className={`p-3 rounded-md transition-all duration-300 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`} style={{ backgroundColor: darkMode ? '' : 'rgba(190, 217, 250, .7)' }}>
            <div className='flex justify-between mb-2'>
              <h3 className='font-semibold'>
                {chart.title}
                <span>
                  <Tippy interactive={false} placement="top" arrow={false} className='info-tippy' content={<span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias impedit dolorum fugiat eveniet ut perferendis a consectetur vero minima, voluptates veritatis architecto pariatur iste molestiae, est tempore magni, recusandae soluta.</span>}>
                    <InfoOutlinedIcon className="focus:outline-none" style={{ height: '16px', width: '16px', marginLeft: '5px' }} />
                  </Tippy>
                </span>
              </h3>
              <SyncIcon style={{cursor: 'pointer'}} onClick={chart.option == option1 ? handleRefreshRegion : handleRefreshType}/>
            </div>
            <div className={`${darkMode ? 'bg-gray-200' : 'bg-white'} rounded-md`} >
              <div className={`relative h-72 w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d]`}>
                <div ref={chart.option == option2 ? chartRef2 : chartRef1} className="absolute inset-0 w-full h-full transition-all duration-500 [backface-visibility:hidden]" style={{ transform: "rotateY(0deg)" }}>
                  {/* <ReactECharts option={chart.option} /> */}
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
              <th className={`pl-0 py-2 ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>Resource Identifier</th>
              <th className={`px-4 py-2 ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>Type</th>
              <th className={`px-4 py-2 ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>Account Id</th>
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
              <th className="px-4 py-2">
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
                      {['us-east-1', 'ap-south-1', 'eu-west-1', 'eu-north-1', 'global'].map(
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
            </tr>
          </thead>
          <tbody>
            {filteredRules.map((item) => (
              <tr>
                <td className={`pl-4 pb-2 text-left ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>{item.resource}</td>
                <td className={`px-4 pb-2 text-center ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>{item.type}</td>
                <td className={`px-4 pb-2 text-center ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>{item.id}</td>
                <td className={`px-4 pb-2 text-left ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}><span className={`mr-1 ${item.compliance == 'COMPLIANT' ? '' : ''}`}><CircleIcon style={{ height: '17px', marginRight: '5px', width: '17px', color: item.compliance == 'COMPLIANT' ? 'green' : '#CF171F' }} /></span>{item.compliance}</td>
                <td className={`px-4 pb-2 text-center ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>{item.region}</td>
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
    </div>
  )
}

export default ResourceExplorer