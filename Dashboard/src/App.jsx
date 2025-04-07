import './App.css'
import Landing from './components/Landing'
import ContextProvider from './context/ContextProvider.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import Accounts from './components/Accounts/Accounts.jsx'
import ConfigRules from './components/ConfigRules/ConfigRules.jsx'
import Exceptions from './components/Exceptions/Exceptions.jsx'
import ResourceExplorer from './components/ResourceExplorer/ResourceExplorer.jsx'
import Misconfiguration from './components/Misconfiguration/Misconfiguration.jsx'
import ComplianceCenter from './components/ComplianceCenter/ComplianceCenter.jsx'
import RemediationCenter from './components/RemediationCenter/RemediationCenter.jsx'
import ComplianceItems from './components/ComplianceCenter/ComplianceItems.jsx'
import ConfigItems from './components/ConfigRules/ConfigItems.jsx'
import ExceptionItems from './components/Exceptions/ExceptionItems.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Landing />}>
      <Route path='' element={<Home />}/>
      <Route path='accounts' element={<Accounts />}/>
      <Route path='config-rules' element={<ConfigRules />}/>
      <Route path='config-rules/compliance/:id' element={<ConfigItems />}/>
      <Route path='exceptions' element={<Exceptions />}/>
      <Route path='exceptions/rule/:id' element={<ExceptionItems />}/>
      <Route path='remediation' element={<RemediationCenter />}/>
      <Route path='resources' element={<ResourceExplorer />}/>
      <Route path='misconfigurations' element={<Misconfiguration />}/>
      <Route path='standards' element={<ComplianceCenter />} />
      <Route path='standards/compliance/:id' element={<ComplianceItems />}/>
    </Route>
  )
)

function App() {

  return (
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  )
}

export default App
