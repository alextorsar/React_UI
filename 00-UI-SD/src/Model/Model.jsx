import React, { useState, useEffect } from "react";
import { getModel, getImageSrc, getModelDocumentation } from "../../api/models-api"
import {
  useParams,
  useNavigate
} from "react-router-dom";
import { ChakraProvider, Stack, Image, Heading, Flex, Button, ButtonGroup } from "@chakra-ui/react";
import { ModelVariablesTable } from "./ModelVariablesTable";

export function Model() {
  var data = [
    { one: 'one', two: 'two', three: 'three' },
    { one: 'uno', two: 'dos', three: 'tres' },
    { one: 'ichi', two: 'ni', three: 'san' }
  ];
    const navigate = useNavigate()
    const modelId = useParams().modelId
    const [model,setModel] = useState(null)
    
    var src = ""
    useEffect( () => {
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
        <Stack height="100%" width="100%" direction="column" display="flex" alignItems="center" margin="2.5%">
            <Flex height = "35%" width="80%" direction="row" alignContent="center" justifyContent="center">
              {
                model ?
                <>
                <Image
                    src={src}
                    alt='Model photo'
                    borderRadius='lg'
                    height="80%"
                    alignSelf="center"
                    boxShadow='lg'
                />
                <Stack height="20%" direction="column" display="flex" justifyContent="center" alignContent="center" width="60%" alignSelf="center">
                  <Heading alignSelf="center" size='lg'>{model.name}</Heading>
                  <ButtonGroup width="100%"gap='2' margin="2.5%" display="flex" flexDirection="row" justifyContent="center">
                    <Button width="40%" colorScheme='messenger' borderRadius="25px">Edit model</Button>
                    <Button width="40%" colorScheme='messenger' borderRadius="25px">Run model</Button>
                </ButtonGroup>
                </Stack>
                </>
                :
                <></>
              }
            </Flex>
            <ModelVariablesTable modelId={modelId}></ModelVariablesTable>
          </Stack>
        </ChakraProvider>
      </React.StrictMode>
    )
}