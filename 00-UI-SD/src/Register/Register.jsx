import React from 'react'
import ReactDOM from 'react-dom/client'
import {NavBar} from '../Home/NavBar'
import {RegisterBox} from './RegisterBox'
import {ChakraProvider, Flex} from '@chakra-ui/react'
import '../index.css'

export function Register(){
    return(
        <ChakraProvider>
        <Flex flexDirection="column" width="100%" height= "100%" justifyContent="flex-start" alignItems="center" bgGradient="linear(to bottom right, #8ed1ff, #eef8ff)">
            <NavBar></NavBar>
            <RegisterBox></RegisterBox>
        </Flex>
        </ChakraProvider>
    )
}