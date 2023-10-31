import React from 'react'
import { Flex, Box, Heading, Spacer, ButtonGroup, Text, Image} from '@chakra-ui/react'
import { MainMenu } from './MainMenu'
export function NavBarLogged({name}){
    return(
        <>
        <Flex width="100%" height= "100%"padding="2.5%" color="blue.500" alignItems='center' gap='2' bg="#D6E6F9">
            <Image
                src="/src/images/logoUPM.png"
                alt='Logo UPM'
                width="12%"
            />
            <Box p='2'>
                <Heading size='lg'>System Dynamics</Heading>
            </Box>
            <Spacer />
            <Heading size='md'>
               Hello, {name}
            </Heading>
            <ButtonGroup gap='2' size="lg">
                <MainMenu></MainMenu>
            </ButtonGroup>
        </Flex>
        <hr color='blue.500'></hr>
        </>
    )
}