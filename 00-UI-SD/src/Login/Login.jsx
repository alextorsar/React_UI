import './Login.css'
import {PasswordInput} from "./PassworInput"

import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box
} from '@chakra-ui/react'

export function Login() {
  return (
    <Box width="40%"display="flex" flexDirection="column" justifyContent="center" alignItems="center" border="2px" borderRadius="5%" bg="#D6E6F9">
      <div className='LoginDiv'>
        <FormControl isRequired>
          <FormLabel>Email address</FormLabel>
          <Input type='email' placeholder="Enter email" bg="white" border="2px"/>
        </FormControl>
        <FormControl isRequired>
        <FormLabel>Password</FormLabel>
          <PasswordInput></PasswordInput>
        </FormControl>
        <Button colorScheme='messenger' size='sm'>Sign in</Button>
      </div>
    </Box>
  )
}

