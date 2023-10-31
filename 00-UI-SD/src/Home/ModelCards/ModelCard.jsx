import React, { useContext } from 'react'
import { Card, CardBody, Image, Stack, Heading, Divider, CardFooter, Button} from '@chakra-ui/react'
import { useState } from 'react'
import { selectedModelsContext } from '../../main.jsx'


export function ModelCard({modelName, imageName}){

    const context = useContext(selectedModelsContext)
    const [isSelected, setSelected] = useState(false)

    const route = `/src/images/${imageName}`

    const handleClick = () => {
        if(isSelected){
            setSelected(false)
            context.setSelectedModels(context.selectedModels.filter((model) => model !== modelName))
        }else{
            setSelected(true)
            context.setSelectedModels([...context.selectedModels, modelName])
        }
    }

    return (
        <Card cursor="pointer" size='lg' variant= "filled"  border={isSelected ? "2px" : "none"}  borderColor="blue" onClick={handleClick}>
            <CardBody >
                <Image
                    src={route}
                    alt='Model photo'
                    borderRadius='lg'
                    height="80%"
                />
                <Stack mt='6' spacing='3'>
                <Heading size='md'>{modelName}</Heading>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <Button variant='solid' colorScheme='messenger'>
                    Open Model
                </Button>
            </CardFooter>
        </Card>
    )
}
