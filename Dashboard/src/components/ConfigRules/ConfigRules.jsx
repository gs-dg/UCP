import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import CircleIcon from '@mui/icons-material/Circle';
import RulesFilter from '../../utils/RulesFilter';
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
import ThemeContext from '../../context/ThemeContext';
import botLogo from '../../../assets/bot-logo.mp4'

const ConfigRules = () => {
  const { darkMode, isNavOpen, selectedAccount, isBotopen, setIsBotOpen } = useContext(ThemeContext);
  // const data = selectedAccount.name == 'Governance' ? useSelector(state => state.tableItems.data) : useSelector(state => state.tableItems.data2);
  // console.log("Data2", useSelector(state => state.tableItems.data2))
  const data = useSelector(state => state.tableItems.data);
  // console.log(data)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRules, setFilteredRules] = useState(data);
  const [severity, setSeverity] = useState('');
  const [sevrty, setSevrty] = useState(['Critical', 'High', "Low"]);
  const [selectedSeverities, setSelectedSeverities] = useState(new Set(['CRITICAL', 'HIGH', 'LOW']));
  const [isSevrtyOpen, setIsSevrtyOpen] = useState(false);
  const [remediation, setRemediation] = useState(['Enabled', 'Disabled']);
  const [selectedRemediations, setSelectedRemediations] = useState(new Set(['ENABLED', 'DISABLED']));
  const [isRemediationOpen, setIsRemediationOpen] = useState(false);
  const [trigger, setTrigger] = useState(['Configuration Change', 'Periodic, 24 Hours']);
  const [selectedTriggers, setSelectedTriggers] = useState(new Set(['CONFIGURATION CHANGE', 'PERIODIC, 24 HOURS']));
  const [isTriggerOpen, setIsTriggerOpen] = useState(false);
  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsSevrtyOpen(false);
        setIsRemediationOpen(false);
        setIsTriggerOpen(false);
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

  const handleRemediationChange = (event) => {
    const value = event.target.value.toUpperCase();
    setSelectedRemediations(prev => {
      const newSet = new Set(prev);
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
      return newSet;
    });
  };

  const handleTriggerChange = (event) => {
    const value = event.target.value.toUpperCase();
    setSelectedTriggers(prev => {
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

    if (!isRemediationOpen) {
      setRemediation(Array.from(selectedRemediations));
    }
    if (!isTriggerOpen) {
      setTrigger(Array.from(selectedTriggers));
    }
  }, [isSevrtyOpen, isRemediationOpen, isTriggerOpen]);


  // useEffect to filter based on severity and search term
  useEffect(() => {
    const filterOnSeverityAndSearch = () => {
      let filteredData = data;
      if (severity) {
        filteredData = filteredData.filter(
          (dta) => dta.severity.toLowerCase() === severity.toLowerCase()
        );
      }

      if (sevrty) {
        filteredData = filteredData.filter(
          rule => sevrty.includes(rule.severity.toUpperCase()));
      }

      if (remediation) {
        filteredData = filteredData.filter(
          rule => remediation.includes(rule.autoRemediation.toUpperCase()));
      }

      if (trigger) {
        filteredData = filteredData.filter(
          rule => trigger.includes(rule.trigger.toUpperCase()));
      }

      if (searchTerm) {
        filteredData = filteredData.filter(
          (dta) => dta.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredRules(filteredData.slice(0, 7));
    };

    filterOnSeverityAndSearch();
  }, [severity, searchTerm, sevrty, trigger, remediation]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
  };

  return (
    <div className={`h-[91.3vh] flex-1 overflow-y-auto ${!isNavOpen ? 'ml-16' : 'ml-48'} px-4 py-2 ${isBotopen ? 'mr-64' : ' md:px-14'} ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`} >
      {/* Header Section */}
      <div className={`flex flex-wrap justify-between mt-3 py-4 border-2 ${darkMode ? 'border-blue-100' : 'border-blue-700'} rounded-md px-4 hover:outline hover:outline-blue-500`}>
        <div className='relative flex gap-2 items-center'>
          <h3 id='heading' className='text-lg font-bold mr-4'><button>{selectedAccount.name} ({selectedAccount.ou}): {selectedAccount.id}</button></h3>
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
          {/* <TuneIcon className='cursor-pointer' style={{ width: '30px', height: '30px' }} onClick={() => setIsFilterOpen(true)} /> */}
        </div>
      </div>

      {/* Table Section */}
      <table className={`table-auto w-full border-2 ${darkMode ? 'border-blue-100' : 'border-blue-700'} mt-6`}>
        <thead>
          <tr className={`border-b-2 ${darkMode ? 'border-blue-100' : 'border-blue-700'} text-center`}>
            <th className={`px-4 py-2 ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>Name</th>
            <th className={`px-4 py-2 ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>
              <div className='relative'>
                Auto-remediation
                <button onClick={() => setIsRemediationOpen(prev => !prev)}>
                  {/* className="relative left-8 sm:left-4 md:left-4 lg:left-5 xl:left-7" */}
                  <FilterAltTwoToneIcon className="relative left-2" />
                </button>
                {isRemediationOpen && (
                  <ul ref={filterRef} className='absolute z-10 text-black bg-white border border-gray-300 rounded-md mt-3 w-full max-h-36 overflow-y-auto text-left'>
                    {['Enabled', 'Disabled'].map((item, index) => (
                      <li
                        key={index}
                        className={`px-3 py-1 flex items-center gap-2 font-sans ${index % 2 !== 0 ? 'bg-gray-200' : ''}`}>
                        <input type="checkbox" name="remediation" value={item.toUpperCase()}
                          checked={selectedRemediations.has(item.toUpperCase())}
                          onChange={handleRemediationChange}
                          className="accent-blue-500"
                        /><label className='text-gray-700'> {item}
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </th>
            <th className={`px-4 py-2 ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>Applicable Resources</th>
            <th className={`px-4 py-2 ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>
              <div className='relative'>
                Trigger
                <button onClick={() => setIsTriggerOpen(prev => !prev)}>
                  {/*  className="relative left-16 sm:left-10 md:left-6 lg:left-10 xl:left-14 */}
                  <FilterAltTwoToneIcon className="relative left-4" />
                </button>
                {isTriggerOpen && (
                  <ul ref={filterRef} className='absolute z-10 text-black bg-white border border-blue-300 rounded-md mt-3 w-full max-h-36 overflow-y-auto text-left'>
                    {['Configuration Change', 'Periodic, 24 Hours'].map((item, index) => (
                      <li
                        key={index}
                        className={`px-2 py-1 flex items-center text-sm gap-2 font-sans ${index % 2 !== 0 ? 'bg-gray-200' : ''}`}
                      >
                        <input type="checkbox" name="trigger" value={item.toUpperCase()}
                          checked={selectedTriggers.has(item.toUpperCase())}
                          onChange={handleTriggerChange}
                          className="accent-blue-500"
                        />
                        <label className='text-gray-700'>{item}</label>
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
                  {/* className="relative left-6 sm:left-2 md:left-2 lg:left-4 xl:left-6 */}
                  <FilterAltTwoToneIcon className="relative left-2" />
                </button>
                {isSevrtyOpen && (
                  <ul ref={filterRef} className='absolute z-10 text-black bg-white border border-blue-300 rounded-md mt-3 w-full max-h-36 overflow-y-auto text-left'>
                    {['Critical', 'High', 'Low'].map((item, index) => (
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
              <td className={`px-4 py-2  text-left ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>
                <Link to={`/config-rules/compliance/${item.id}`} className="text-blue-500">
                  {item.name}
                </Link>
              </td>
              <td className={`px-4 py-2 text-center ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}><span className={`mr-1 ${item.autoRemediation == 'Enabled' ? 'pr-1': ''}`}><CircleIcon style={{height:'17px', marginRight: '5px', width:'17px', color: item.autoRemediation == 'Enabled' ? 'green' : '#CF171F'}}/></span>{item.autoRemediation}</td>
              <td className={`px-4 py-2 text-center ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>
                {item.resources &&
                  item.resources.split(',').map((resource, index) => (
                    <div key={index}>{resource.trim()}</div>
                  ))}
              </td>
              <td className={`px-4 py-2 text-center ${darkMode ? 'border-blue-100' : 'border-blue-700'}`}>{item.trigger}</td>
              <td className="my-1 text-center"><button className='px-2 py-1 rounded-lg w-20 text-white' style={{ backgroundColor: item.severity === 'CRITICAL' ? '#CF171F' : item.severity === 'HIGH' ? '#F47721' : item.severity === 'LOW' ? '#C1D72E' : '' }}>{item.severity}</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Section */}
      <div className={`flex justify-center border-b-2 border-l-2 border-r-2 space-x-2 py-2 ${darkMode ? 'border-blue-100 text-white' : 'border-blue-700 text-black'}`}>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            style={{ borderRadius: '50%' }}
            className={`${currentPage === page
              ? 'px-3 py-1 bg-blue-500 text-white border-blue-500'
              : 'px-1 py-1 bg-transparent text-current border-gray-300'}`}
          >
            {page}
          </button>
        ))}
      </div>

      {isFilterOpen && <RulesFilter severityList={['High', 'Critical', 'Low']} setSeverity={setSeverity} setIsFilterOpen={setIsFilterOpen} />}

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

export default ConfigRules
