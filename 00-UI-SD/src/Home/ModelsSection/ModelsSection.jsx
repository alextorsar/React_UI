import { AddIcon, SearchIcon } from '@chakra-ui/icons'
import { Flex, Heading, Spacer, Button,ButtonGroup, InputGroup, InputLeftElement, Input, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { DeleteButton } from './DeleteButton'
import {NewModelForm} from '../../NewModel/NewModelForm.jsx'

export function ModelsSection({setSearchName}){
    
    const handleChange = (event) => {
        setSearchName(event.target.value)
    }
    const { isOpen, onOpen, onClose } = useDisclosure()
    return(
        <>
            <Flex width= "100%" justifyContent="flex-start" alignItems = "flx-start" margin="1%" gap="3" bgColor="white">
                <Heading size='lg' margin="2.5%" marginRight="0px">
                    Your models:
                </Heading>
                <Spacer/>
                <InputGroup margin="2.5%"  marginLeft="1.5%" marginRight="1.5%" width="48%">
                    <InputLeftElement pointerEvents='none'>
                        <SearchIcon color='gray.300' />
                    </InputLeftElement>
                    <Input onChange={handleChange} placeholder='Search model...' />
                </InputGroup>
                <Spacer/>
                <ButtonGroup gap='2' margin="2.5%">
                    <DeleteButton></DeleteButton>
                    <Button onClick={onOpen} leftIcon={<AddIcon />} colorScheme='messenger'>New model</Button>
                </ButtonGroup>
            </Flex>
            <NewModelForm isOpen={isOpen} onClose={onClose}></NewModelForm>
        </>
    )
}