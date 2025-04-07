import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import TuneIcon from '@mui/icons-material/Tune';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ThemeContext from '../../context/ThemeContext';
import RulesFilter from '../../utils/RulesFilter';
import botLogo from '../../../assets/bot-logo.mp4'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const ComplianceItems = () => {
  const { id } = useParams()
  const { darkMode, isNavOpen, selectedAccount, isBotopen, setIsBotOpen } = useContext(ThemeContext);
  const [selectedButton, setSelectedButton] = useState('general');
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRules, setFilteredRules] = useState([]);
  const [selectedAccnt, setSelectedAccnt] = useState(null);
  const [severity, setSeverity] = useState('');
  const navigate = useNavigate();
  const data = selectedAccount.name == 'Governance' ? useSelector(state => state.tableItems.data) : useSelector(state => state.tableItems.data2);

  const compData = data.find(dta => dta.id === Number(id))

  const handleButtonClick = (value) => {
    setSelectedButton(value);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value.length === 0) {
      setFilteredRules([]);
      return;
    }

    const filtered = data.filter(
      (dta) =>
        dta.severity.toLowerCase() === severity.toLowerCase() &&
        (dta.name.toString().includes(value))
    );

    setFilteredRules(filtered.slice(0, 3));
  };

  const handleSelectAccount = (dta) => {
    setSearchTerm(dta.name.toString());
    setFilteredRules([]);
    setSelectedAccnt(dta);
  };

  const handleSearchClick = () => {
    setSearchTerm('')
    if (selectedAccnt) {
      navigate(`/standards/compliance/${selectedAccnt.id}`);
    }
  };

  const exceptionRequest = () => {
    toast.success('Exception request has been submitted!', {
      theme: darkMode ? "dark" : "light",
    },
    navigate('/exceptions')
  )};

  return (
    <div className={`h-[91.3vh] flex-1 overflow-y-auto ${!isNavOpen ? 'ml-16' : 'ml-48'} px-4 py-2 ${isBotopen ? 'mr-64' : ' md:px-14'} ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      {/* Header Section */}
      <div className={`flex flex-wrap justify-between mt-3 py-4 border-2 ${darkMode ? 'border-blue-100' : 'border-blue-700'} rounded-md px-4 hover:outline hover:outline-blue-500`}>
        <h1 className='text-lg font-bold'>{compData ? compData.name : 1}</h1>
        <div className='flex gap-4 items-center'>
        <div className='relative w-56'>
            <input
              type='text'
              placeholder='Rule name'
              className='text-gray-700 px-3 py-1 w-full rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-indigo-500'
              value={searchTerm}
              onChange={handleSearch}
            />
            {filteredRules.length > 0 && (
              <ul className='absolute left-0 top-full mt-1 z-10 bg-white border border-blue-300 rounded-md w-full overflow-y-auto max-h-40 shadow-lg'>
                {filteredRules.map((dta) => (
                  <li
                    key={dta.id}
                    className='border-b border-blue-500 text-gray-700 px-3 py-2 hover:bg-gray-200 cursor-pointer'
                    onClick={() => handleSelectAccount(dta)}
                  >
                    {dta.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <SearchOutlinedIcon className='cursor-pointer' style={{ width: '30px', height: '30px' }} onClick={handleSearchClick} />
          <TuneIcon className='cursor-pointer' style={{ width: '30px', height: '30px' }} onClick={() => setIsFilterOpen(true)} />
        </div>
      </div>

      {/* Overview Section */}
      <div className={`border-b-2 border-r-2 border-l-2 pt-4 pb-10 px-4 ${darkMode ? 'border-blue-100' : 'border-blue-700'} rounded-md `}>
        <h3>Checks of an EC2 instance is launched in the public subnet. Marks an EC2 instance NON_COMPLIANT if the instance is launched in the public subnet. </h3>
        <div className='flex flex-wrap justify-between py-2'>
          <p><span className='font-semibold'>ID</span> - {compData ? compData.id : 1}</p>
          <p><span className='font-semibold'>Supported In</span> - AWS, AWS US Gov</p>
          <p><span className='font-semibold'>Severity</span> - {compData ? compData.severity : 'CRITICAL'}</p>
          <p><span className='font-semibold'>Release Date</span> - 25 January 2024</p>
        </div>
        <div className='flex gap-12'>
          <p><span className='font-semibold'>Exceptions Supported</span> - YES</p>
          <p><span className='font-semibold'>Auto-remediation Supported</span> - {compData ? (compData.autoRemediation == 'Available' ? 'YES' : 'NO') : 'YES'}</p>
        </div>
      </div>

      {/* Button Navigation Section */}
      <div className={`flex justify-start border-b mt-6 mb-3 ${darkMode ? 'border-blue-200' : 'border-blue-800'}`}>
        <button
          className={`border-r ${darkMode ? 'border-blue-200' : 'border-blue-800'} px-4 pb-1 mb-1 focus:outline-none ${selectedButton == 'general' ? 'font-bold' : ''}`}
          onClick={() => handleButtonClick('general')}
        >
          General
        </button>
        <button
          className={`border-r ${darkMode ? 'border-blue-200' : 'border-blue-800'} px-4 pb-1 mb-1 focus:outline-none ${selectedButton == 'exception' ? 'font-bold' : ''}`}
          onClick={() => handleButtonClick('exception')}
        >
          Exception
        </button>
        <button
          className={`border-r ${darkMode ? 'border-blue-200' : 'border-blue-800'} px-4 pb-1 mb-1 focus:outline-none ${selectedButton == 'autoRemediation' ? 'font-bold' : ''}`}
          onClick={() => handleButtonClick('autoRemediation')}
        >
          Auto-remediation
        </button>
        <button
          className={` px-4 pb-1 mb-1 focus:outline-none ${selectedButton == 'standards' ? 'font-bold' : ''}`}
          onClick={() => handleButtonClick('standards')}
        >
          Standards & AWS WA-F
        </button>
      </div>

      {/* Content Section based on selected button */}
      <div className={`border ${darkMode ? 'border-blue-200 bg-gray-800' : 'bg-white border-blue-800'} hover:outline hover:outline-blue-500 px-8 py-4 rounded-lg`}>
        {selectedButton === 'general' && (<>
          <p className='pb-1'><span className='font-semibold'>Resources monitored</span>: {compData ? compData.name.split('-')[0].toUpperCase() : 'EC2'}</p>
          <p className='pb-1'><span className='font-semibold'>Applicable regions</span>: All</p>
          <p className='pb-1'><span className='font-semibold'>Category </span>: Network Security</p>
          <p className='pb-1'><span className='font-semibold'>Trigger</span>: {compData ? compData.trigger : 'Configuration Change'} </p>
          <p className='pb-1'><span className='font-semibold'>Total Resource ExceptionsPeriodic evaluation frequency</span>: N/A</p>
        </>)}
        {selectedButton === 'exception' && (<>
          <p className='pb-1'><span className='font-semibold'>Type</span>: Simple</p>
          <p className='pb-1'><span className='font-semibold'>Format</span>: Resource ID ( EC2 Instance ID )</p>
          <p className='pb-1'><span className='font-semibold'>Example</span>: i-e03tyr09i</p>
          <p className='pb-1'><span className='font-semibold'>Request exception: </span> <button onClick={exceptionRequest} style={{padding: '1px 12px 3px 12px'}} className='text-white rounded bg-blue-600 ml-2'>Submit</button></p>
        </>)}
        {selectedButton === 'autoRemediation' && (<>
          <p className='pb-1'><span className='font-semibold'>Action</span>: The noncompliant instance is stopped.</p>
          <p className='pb-1'><span className='font-semibold'>Opt-in Optional</span>: False</p>
          <p className='pb-1'><span className='font-semibold'>By-default enabled in the new account</span>: True</p>
          <p className='pb-1'><span className='font-semibold'>Enable or suspend remediation</span>: <button style={{padding: '1px 12px 3px 12px'}} className='text-white rounded bg-blue-600 ml-2'>Submit</button></p>
        </>)}
        {selectedButton === 'standards' && (<>
          <p className='pb-1'><span className='font-semibold'>Rule can help you with:</span></p>
          <ol className='pl-5 text-sm list-decimal list-inside'>
            <li>NIST SP 800-53 Rev. 5</li>
            <li>CIS</li>
            <li>PCI DSS</li>
          </ol>
          <p className='pb-1'><span className='font-semibold'>AWS Well-Architected Framework:</span></p>
          <ul className='pl-5 text-sm list-disc list-inside'>
            <li>Security pillar</li>
          </ul>
        </>)}
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

      <ToastContainer />
    </div>
  )
}

export default ComplianceItems
