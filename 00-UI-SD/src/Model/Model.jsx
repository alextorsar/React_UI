import React, { useState, useEffect} from "react";
import { getModel, getImageSrc, getModelDocumentation } from "../../api/models-api"
import { getUser } from "../../api/users-api"
import {
  useParams,
  useNavigate
} from "react-router-dom";
import { ChakraProvider, Stack, Image, Heading, Flex, Button, ButtonGroup } from "@chakra-ui/react";
import { ModelVariablesTable } from "./ModelVariablesTable";
import {NavBarLogged} from '../Home/LoggedNavBar/NavBarLogged'

export function Model() {
    const [user,setUser] = useState({})
    const navigate = useNavigate()
    const modelId = useParams().modelId
    const [model,setModel] = useState(null)

    const handleRunButtonClick = () => {
      console.log("Hola")
    }
    
    var src = ""
    useEffect( () => {
      getUser().then(
        (response) => {
          if(response.status === 200){
             setUser(response.data)
          }
        }
      ).catch(() => {
        navigate("/login")
      });
      getModel(modelId).then(
        (response) => {
          if(response.status === 200){
            setModel(response.data)
          }
        }
        ).catch((e) => {
          navigate('/login')
        });
    },[])
    if(model != null){
      src = getImageSrc(model.image)
    }
    return (
    <React.StrictMode>
      <ChakraProvider>
      <Stack height="auto" width="100%" direction="column" display="flex" alignItems="center">
        <NavBarLogged name={user.name}></NavBarLogged>
        <Stack height="auto" width="100%" direction="column" display="flex" alignItems="center" margin="2.5%"> 
            <Flex height="35%" minHeight="35%" maxHeight="35%" width="90%" direction="row" alignContent="center" justifyContent="center">
              {
                model ?
                <>
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
                  <Heading alignSelf="center" size='lg'>{model.name}</Heading>
                  <ButtonGroup width="100%"gap='2' margin="2.5%" display="flex" flexDirection="row" justifyContent="center">
                    <Button width="40%" colorScheme='messenger' borderRadius="25px">Edit model</Button>
                    <Button width="40%" colorScheme='messenger' borderRadius="25px" onClick={handleRunButtonClick}>Run model</Button>
                </ButtonGroup>
                </Stack>
                </>
                :
                <></>
              }
            </Flex>
            <Heading marginBottom="2.5%" marginTop="3%"alignSelf="center" size='md'>Model Variables</Heading>
            <ModelVariablesTable modelId={modelId}></ModelVariablesTable>
          </Stack>
          </Stack>
        </ChakraProvider>
      </React.StrictMode>
    )
}