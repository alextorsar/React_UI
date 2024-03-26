import React, { createContext, useState,  useEffect } from 'react'
import {ChakraProvider, Flex} from '@chakra-ui/react'
import {NavBarLogged} from './LoggedNavBar/NavBarLogged'
import { ModelCardGrid } from './ModelCards/ModelCardGrid'
import { ModelsSection } from './ModelsSection/ModelsSection'
import { getUser } from '../../api/users-api'
import { getModels } from '../../api/models-api'
import { useNavigate} from "react-router-dom";


import '../index.css'

export const selectedModelsContext = createContext()



export function Logged(){
  const [user,setUser] = useState({})
  const [models,setModels] = useState([])
  const [selectedModels, setSelectedModels] = useState([])
  const [searchName, setSearchName] = React.useState('')
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
        getModels().then(
          (response) => {
            if(response.status === 200){
              setModels(response.data)
            }
          }
        )
    }, []
  )
  
  return(
    <React.StrictMode>
      <ChakraProvider>
        <Flex flexDirection="column" height="auto" width="100%" justifyContent="center" alignItems="center" backgroundColor="white">
            <NavBarLogged name={user.name}></NavBarLogged>
            <selectedModelsContext.Provider value={{selectedModels, setSelectedModels, models, setModels, user}}>
              <ModelsSection setSearchName={setSearchName}></ModelsSection>
              <ModelCardGrid searchName={searchName}></ModelCardGrid>
            </selectedModelsContext.Provider>
        </Flex> 
      </ChakraProvider>
    </React.StrictMode>
  )
}