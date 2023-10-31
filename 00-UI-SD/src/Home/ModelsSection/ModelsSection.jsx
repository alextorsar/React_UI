import { AddIcon, SearchIcon } from '@chakra-ui/icons'
import { Flex, Heading, Spacer, Button,ButtonGroup, InputGroup, InputLeftElement, Input } from '@chakra-ui/react'
import React from 'react'
import { DeleteButton } from './DeleteButton'

export function ModelsSection(){
    return(
        <Flex width= "100%" justifyContent="flex-start" alignItems = "flx-start" margin="1%" gap="3">
            <Heading size='lg' margin="2.5%" marginRight="0px">
                Your models:
            </Heading>
            <Spacer/>
            <InputGroup margin="2.5%"  marginLeft="1.5%" marginRight="1.5%" width="48%">
                <InputLeftElement pointerEvents='none'>
                    <SearchIcon color='gray.300' />
                </InputLeftElement>
                <Input placeholder='Search model...' />
            </InputGroup>
            <Spacer/>
            <ButtonGroup gap='2' margin="2.5%">
                <DeleteButton></DeleteButton>
                <Button leftIcon={<AddIcon />} colorScheme='messenger'>New model</Button>
            </ButtonGroup>
        </Flex>
    )
}