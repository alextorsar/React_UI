import React, { createContext, useState,  useEffect } from 'react'
import {ChakraProvider, Flex} from '@chakra-ui/react'
import {NavBarLogged} from './LoggedNavBar/NavBarLogged'
import { ModelCardGrid } from './ModelCards/ModelCardGrid'
import { ModelsSection } from './ModelsSection/ModelsSection'
import { getUser } from '../../api/users-api'
import { useNavigate} from "react-router-dom";


import '../index.css'

export const selectedModelsContext = createContext()



export function Logged(){
  const [user,setUser] = useState({})
  const navigate = useNavigate()

  useEffect(
    () => {
        getUser().then(
          (response) => {
            if(response.status === 200){
               setUser(response.data)
            }
          }
        ).catch(() => {
          navigate("/login")
        }); 
    }, []
  )
  const [selectedModels, setSelectedModels] = useState([])
  return(
    <React.StrictMode>
      <ChakraProvider>
        <Flex flexDirection="column" width="100%" justifyContent="center" alignItems="center" backgroundColor="#F2F2F2">
            <NavBarLogged name={user.name}></NavBarLogged>
            <selectedModelsContext.Provider value={{selectedModels, setSelectedModels}}>
              <ModelsSection></ModelsSection>
              <ModelCardGrid></ModelCardGrid>
            </selectedModelsContext.Provider>
        </Flex> 
      </ChakraProvider>
    </React.StrictMode>
  )
}