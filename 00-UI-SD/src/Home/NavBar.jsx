import React from 'react'
import { Flex, Box, Heading, Spacer, ButtonGroup, Button, Image} from '@chakra-ui/react'

export function NavBar(){
    return(
        <>
        <Flex width="100%" height= "15%" padding="2.5%" color="blue.500" alignItems='center' bg="rgb(9, 9, 9, 0)">
            <Image
                src="/src/images/logoUPM.png"
                alt='Logo UPM'
                width="10%"
            />
            <Box p='2'>
                <Heading size='md' color="#19438f">System Dynamics</Heading>
            </Box>
            <Spacer />
        </Flex>
        </>
    )
}