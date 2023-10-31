import React from 'react'
import { Flex, Box, Heading, Spacer, ButtonGroup, Button, Image} from '@chakra-ui/react'
export function NavBar(){
    return(
        <>
        <Flex width="100%" height= "100%"padding="2.5%" color="blue.500" alignItems='center' gap='2' bg="#D6E6F9">
            <Image
                src="/src/images/logoUPM.png"
                alt='Logo UPM'
                width="10%"
            />
            <Box p='2'>
                <Heading size='md'>System Dynamics</Heading>
            </Box>
            <Spacer />
            <ButtonGroup gap='2'>
                <Button colorScheme='messenger'>Sign Up</Button>
                <Button colorScheme='messenger'>Log in</Button>
            </ButtonGroup>
        </Flex>
        </>
    )
}