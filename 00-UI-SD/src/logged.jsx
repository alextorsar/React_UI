import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import {ChakraProvider, Flex} from '@chakra-ui/react'
import {NavBarLogged} from './Home/LoggedNavBar/NavBarLogged'
import { ModelCardGrid } from './Home/ModelCards/ModelCardGrid'
import { ModelsSection } from './Home/ModelsSection/ModelsSection'


import './index.css'

export const selectedModelsContext = createContext()

function App(){
  const [selectedModels, setSelectedModels] = useState([])
  console.log(selectedModels)
  return(
    <React.StrictMode>
      <ChakraProvider>
        <Flex flexDirection="column" width="100%" justifyContent="center" alignItems="center" backgroundColor="#F2F2F2">
            <NavBarLogged name="Alex"></NavBarLogged>
            <selectedModelsContext.Provider value={{selectedModels, setSelectedModels}}>
              <ModelsSection></ModelsSection>
              <ModelCardGrid></ModelCardGrid>
            </selectedModelsContext.Provider>
        </Flex> 
      </ChakraProvider>
    </React.StrictMode>
  )
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <App></App>
)














