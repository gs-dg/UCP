import { useState} from 'react'
import ThemeContext from './ThemeContext'

function ContextProvider({ children }) {
    const [ darkMode, setDarkMode ] = useState(false)
    const [ isNavOpen, setIsNavOpen ] = useState(false)
    const [ isBotopen, setIsBotOpen ] = useState(false)
    const [ ou, setOu ] = useState('Prod');
    const [ selectedAccount, setSelectedAccount ] = useState({'name': 'Governance', 'ou': 'Prod', 'id': 123412341234, 'owner': 'Sam Doe', 'activeRegions': 25})

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, isNavOpen, setIsNavOpen, ou, setOu, selectedAccount, setSelectedAccount, isBotopen, setIsBotOpen }}>
        {children}
    </ThemeContext.Provider>
  )
}

export default ContextProvider