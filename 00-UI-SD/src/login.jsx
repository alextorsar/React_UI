import React from 'react'
import ReactDOM from 'react-dom/client'
import {NavBar} from './Home/NavBar'
import {LoginBox} from './Login/LoginBox'
import {ChakraProvider, Flex} from '@chakra-ui/react'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
      <ChakraProvider>
        <Flex flexDirection="column" width="100%" height= "100%" justifyContent="flex-start" alignItems="center" bgGradient="linear(to bottom right, #8ed1ff, #eef8ff)">
          <NavBar></NavBar>
          <LoginBox></LoginBox>
        </Flex>
      </ChakraProvider>
)