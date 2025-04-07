import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import ThemeContext from '../../context/ThemeContext'
import TuneIcon from '@mui/icons-material/Tune';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AccountFilters from '../../utils/AccountFilters';
import OutboundTwoToneIcon from '@mui/icons-material/OutboundTwoTone';
import botLogo from '../../../assets/bot-logo.mp4'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const Accounts = () => {
  const { darkMode, isNavOpen, ou, selectedAccount, setSelectedAccount, isBotopen, setIsBotOpen } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState('configSettings');
  const [showOperationalUnit, setShowOperationalUnit] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const accounts = useSelector(state => state.account.accounts)

  const handleButtonClick = (value) => {
    setSelectedButton(value);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value.length === 0) {
      setFilteredAccounts([]);
      return;
    }

    const filtered = accounts.filter(
      (account) => 
        account.ou.toLowerCase() === ou.toLowerCase() &&
        (account.id.toString().includes(value))
    );
    
    setFilteredAccounts(filtered.slice(0, 3));
  };

  const handleSelectAccount = (account) => {
    setSearchTerm(account.id.toString());
    setFilteredAccounts([]);
  };

  const handleSearchClick = () => {
    if (searchTerm) {
      const selected = accounts.find((acc) => acc.id.toString() === searchTerm);
      setSelectedAccount(selected);
    }
    setSearchTerm('');
  };

  return (
    <div className={`h-[91.3vh] flex-1 overflow-y-auto ${!isNavOpen ? 'ml-16' : 'ml-48'} px-4 py-2 ${isBotopen ? 'mr-64' : ' md:px-14'} ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      {/* Header Section */}
      <div className='flex flex-wrap justify-between pt-4 pb-4'>
        <div className='flex gap-2 items-center'>
          <h3 id='accntData' className='text-lg font-bold mr-4'>{selectedAccount ? `${selectedAccount.name} (${selectedAccount.ou}): ${selectedAccount.id}` : 'Governance (Prod): 123412341236'}</h3>
          <div className='relative'>
            <input
              type='text'
              placeholder='Account ID'
              className='text-gray-700 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500'
              value={searchTerm}
              onChange={handleSearch}
            />
            {filteredAccounts.length > 0 && (
              <ul className='absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full max-h-36 overflow-y-auto'>
                {filteredAccounts.map((account) => (
                  <li
                    key={account.id}
                    className='border-b border-gray-500 text-gray-700 px-3 py-2 hover:bg-gray-200 cursor-pointer'
                    onClick={() => handleSelectAccount(account)}
                  >
                    {account.name} ({ou}):{account.id}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <SearchOutlinedIcon className='cursor-pointer' style={{ width: '30px', height: '30px' }} onClick={handleSearchClick} />
        </div>
        <div className='flex gap-4 items-center'>
          {/* Change the retrieved value to Upper Case */}
          <h3 className='text-lg font-semibold'>OU = {ou}</h3>
          <TuneIcon className='cursor-pointer' style={{ width: '30px', height: '30px' }} onClick={() => setShowOperationalUnit(true)} />
        </div>
      </div>

      {/* Account Overview */}
      <div className={`border ${darkMode ? 'border-blue-100 bg-gray-800' : 'bg-white border-blue-800'} px-8 pt-4 pb-6 rounded-lg hover:outline hover:outline-blue-500`}>
        <h1 className='text-xl font-bold mb-3'>Account Overview</h1>
        <div className='flex justify-between text-md'>
          <div>
            <p className='pb-2'><span className='font-semibold'>Name</span> - {selectedAccount ? selectedAccount.name : 'Governance'} ({selectedAccount ? selectedAccount.ou : 'Prod'})</p>
            <p><span className='font-semibold'>Owner</span> - {selectedAccount ? selectedAccount.owner : 'John Doe'}</p>
          </div>
          <div >
            <div className='flex justify-between pb-2'>
              <p><span className='font-semibold'>ID</span> - {selectedAccount ? selectedAccount.id : '123412341236'}</p>
              <p><span className='font-semibold'>Status</span> - Active</p>
            </div>
            <p><span className='font-semibold'>Root Email Address</span> - governance.p@cloud.com</p>
          </div>
          <div className='text-left ml-4'>
            <p className='pb-2'><span className='font-semibold'>Join Method</span> - Created</p>
            <p><span className='font-semibold'>OU</span> - {selectedAccount ? selectedAccount.ou : 'Prod'} (r-outx3e)&nbsp;</p>
          </div>
        </div>
      </div>

      {/* Button Navigation Section */}
      <div className={`flex justify-start border-b mt-6 mb-3 ${darkMode ? 'border-blue-100' : 'border-blue-800'}`}>
        <button
          className={`border-r ${darkMode ? 'border-blue-100' : 'border-blue-800'} px-4 pb-1 mb-1 focus:outline-none ${selectedButton == 'configSettings' ? 'font-bold' : ''}`}
          onClick={() => handleButtonClick('configSettings')}
        >
          AWS Config Settings
        </button>
        <button
          className={`border-r ${darkMode ? 'border-gray-100' : 'border-blue-800'} px-4 pb-1 mb-1 focus:outline-none ${selectedButton == 'details' ? 'font-bold' : ''}`}
          onClick={() => handleButtonClick('details')}
        >
          Account Details
        </button>
        <button
          className={` px-4 pb-1 mb-1 focus:outline-none ${selectedButton == 'security' ? 'font-bold' : ''}`}
          onClick={() => handleButtonClick('security')}
        >
          Basic Security Overview
        </button>
      </div>

      {/* Content Section based on selected button */}
      <div className={`border ${darkMode ? 'border-blue-100 bg-gray-800' : 'bg-white border-blue-800'} hover:outline hover:outline-blue-500 px-8 py-4 rounded-lg`}>
        {selectedButton === 'configSettings' && (<>
          <p className='pb-1'><span className='font-semibold'>Active Regions</span> - {selectedAccount ? selectedAccount.activeRegions : '17'}</p>
          <p className='pb-1'><span className='font-semibold'>Config Recorder Enabled</span> - True</p>
          <p className='pb-1'><span className='font-semibold'>Config Rules Deployed</span> - {selectedAccount.name == "Governance" ? 40 : 35} <OutboundTwoToneIcon onClick={() => navigate('/config-rules')} color={darkMode ? 'info' : 'primary'} className='cursor-pointer'/></p>
          <p className='pb-1'><span className='font-semibold'>Config Remediation Enabled</span> - {selectedAccount.name == "Governance" ? 25 : 22} <OutboundTwoToneIcon onClick={() => navigate('/remediation')} color={darkMode ? 'info' : 'primary'} className='cursor-pointer'/></p>
          <p className='pb-1'><span className='font-semibold'>Total Resource Exceptions</span> - {selectedAccount.name == "Governance" ? 235 : 250} <OutboundTwoToneIcon onClick={() => navigate('/exceptions')} color={darkMode ? 'info' : 'primary'} className='cursor-pointer'/></p>
        </>)}
        {selectedButton === 'details' && (<>
          <p className='pb-1'><span className='font-semibold'>Business Unit</span> - CIT</p>
          <p className='pb-1'><span className='font-semibold'>Business Unit Alignment</span> - VCIT</p>
          <p className='pb-1'><span className='font-semibold'>Division</span> - 2521</p>
          <p className='pb-1'><span className='font-semibold'>Densify Integration</span> - DISABLED</p>
          <p className='pb-1'><span className='font-semibold'>Tenable Integration</span> - ENABLED</p>
        </>)}
        {selectedButton === 'security' && (<>
          <p className='pb-1'><span className='font-semibold'>EBS Default Volume Encryption Enabled</span> - True</p>
          <p className='pb-1'><span className='font-semibold'>S3 Block Public Access Enabled</span> - True</p>
          <p className='pb-1'><span className='font-semibold'>Default VPCs</span> - 0</p>
          <p className='pb-1'><span className='font-semibold'>IDPs</span> - {selectedAccount.name == "Governance" ? 2 : 3}</p>
          <p className='pb-1'><span className='font-semibold'>IAM Users</span> - {selectedAccount.name == "Governance" ? 4 : 5}</p>
        </>)}
      </div>

      {showOperationalUnit && <AccountFilters ouList={['Prod', 'Non-Prod', 'Pilot']}  setShowOperationalUnit={setShowOperationalUnit} />}
    
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
  );
};

export default Accounts;
