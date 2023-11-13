import React from 'react'
import {NavBar} from '../Home/NavBar'
import {LoginBox} from './LoginBox'
import {ChakraProvider, Flex} from '@chakra-ui/react'

import '../index.css'

export function Login(){
  return(
    <ChakraProvider>
        <Flex flexDirection="column" width="100%" height= "100%" justifyContent="flex-start" alignItems="center" bgGradient="linear(to bottom right, #8ed1ff, #eef8ff)">
          <NavBar></NavBar>
          <LoginBox></LoginBox>
        </Flex>
      </ChakraProvider>
  )
}