import React, { useContext } from 'react'
import { Card, CardBody, Image, Stack, Heading, Divider, CardFooter, Button} from '@chakra-ui/react'
import { useState } from 'react'
import { selectedModelsContext } from '../Logged'
import {getImageSrc} from '../../../api/models-api'
import { useNavigate } from 'react-router-dom'


export function ModelCard({model}){

    const navigate = useNavigate()
    const context = useContext(selectedModelsContext)
    const [isSelected, setSelected] = useState(false)
    const route = getImageSrc(model.image)

    const handleCardClick = () => {
        if(isSelected){
            setSelected(false)
            context.setSelectedModels(context.selectedModels.filter((selectedModel) => selectedModel != model))
        }else{
            setSelected(true)
            context.setSelectedModels([...context.selectedModels, model])
        }
    }

    const handleButtonClick = () => {
        navigate('/model/' + model.id)
    }

    return (
        <Card cursor="pointer" size='lg' width="100%" minWidth="100%" maxWidth="100%" height="100%" minHeight="100%" maxHeight="100%" bg="#D6E6F9" border={isSelected ? "2px" : "none"}  borderColor="blue" onClick={handleCardClick} display="flex" alignContent="center">
            <CardBody  display="flex" flexDirection="column">
                <Image
                    width="90%" minWidth="90%" maxWidth="90%"
                    height="80%" minHeight="80%" maxHeight="80%"
                    marginTop="3%"
                    src={route}
                    alt='Model photo'
                    borderRadius='lg'   
                    alignSelf="center"
                    objectFit="cover"
                />
                <Stack mt='6' spacing='3'>
                <Heading size='md'>{model.name}</Heading>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <Button variant='solid' colorScheme='messenger' onClick={handleButtonClick}>
                    Open Model
                </Button>
            </CardFooter>
        </Card>
    )
}
