import React, { useState, useEffect} from "react";
import { getModel, getModelDocumentation, getSubModels } from "../../api/models-api"
import { getUser } from "../../api/users-api"
import {
  useParams,
  useNavigate
} from "react-router-dom";
import { ChakraProvider, Stack, Image, Heading, Flex, Button, ButtonGroup, useDisclosure, Text, useFormControlStyles } from "@chakra-ui/react";
import { ModelVariablesTable } from "./ModelVariablesTable";
import {NavBarLogged} from '../Home/LoggedNavBar/NavBarLogged'
import {ModelExecutionForm} from '../RunModel/ModelExecutionForm'
import {SDModel} from './ModelClasses'
import {UpdateModelForm} from '../UpdateModel/UpdateModelForm'

export function Model() {
    const updateModalWindow = useDisclosure()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [user,setUser] = useState({})
    const navigate = useNavigate()
    const modelId = useParams().modelId
    const [model,setModel] = useState(null)
    const [subModels,setSubModels] = useState([])
    
    var src = ""
    useEffect( () => {
      getUser().then(
        (response) => {
          if(response.status === 200){
            setUser(response.data)
          }
        }
      ).catch((error) => {
        navigate("/login")
      });
      getModel(modelId).then(
        (modelResponse) => {
          if(modelResponse.status === 200){
            getModelDocumentation(modelId).then(
              (variablesResponse) => {
                if(variablesResponse.status === 200){
                  setModel(new SDModel(modelResponse.data,variablesResponse.data))
                  getSubModels(modelId).then(
                    (subModelsResponse) => {
                      setSubModels(subModelsResponse.data)
                    }
                  )
                }
              }
            )
          }
        }
        ).catch((e) => {
          navigate('/login')
        });
    },[])
    if(model != null){
      src = model.getImageSrc()
    }
    return (
    <React.StrictMode>
      <ChakraProvider>
        <Stack height="auto" width="100%" direction="column" display="flex" alignItems="center">
          {
            model ?
            <>
              <NavBarLogged name={user.name}></NavBarLogged>
              <Stack height="auto" width="100%" direction="column" display="flex" alignItems="center" margin="2.5%"> 
                <Flex height="35%" minHeight="35%" maxHeight="35%" width="90%" direction="row" alignContent="center" justifyContent="center">
                  <Image
                      width="25rem" minWidth="25rem" maxWidth="25rem"
                      height="20rem" minHeight="20rem" maxHeight="20rem"
                      src={src}
                      alt='Model photo'
                      borderRadius='lg'
                      alignSelf="center"
                      boxShadow='lg'
                      objectFit="cover"
                  />
                  <Stack height="20%" direction="column" display="flex" justifyContent="center" alignContent="center" width="60%" alignSelf="center">
                    <Heading alignSelf="center" size='lg'>{model.getName()}</Heading>
                    <ButtonGroup width="100%"gap='2' margin="2.5%" display="flex" flexDirection="row" justifyContent="center">
                      <Button width="40%" colorScheme='messenger' borderRadius="25px" onClick={updateModalWindow.onOpen}>Edit model</Button>
                      <Button width="40%" colorScheme='messenger' borderRadius="25px" onClick={onOpen}>Run model</Button>
                    </ButtonGroup>
                  </Stack>
                </Flex>
                <Heading marginBottom="2.5%" marginTop="3%"alignSelf="center" size='md'>Model Variables</Heading>
                <ModelVariablesTable model={model}></ModelVariablesTable>
                <ModelExecutionForm isOpen={isOpen} onClose={onClose} model={model}></ModelExecutionForm>
                <UpdateModelForm isOpen={updateModalWindow.isOpen} onClose={updateModalWindow.onClose} model={model} subModels={subModels} setModel={setModel} setSubModels={setSubModels}></UpdateModelForm>
              </Stack>
            </>
            :
            <></>
          }  
        </Stack>
      </ChakraProvider>
    </React.StrictMode>
    )
}