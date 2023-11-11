import './Login.css'
import './LoginBox.css'

import React from 'react'
import {PasswordInput} from "./PassworInput"
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Heading,
  Image,
  Text
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'


export function LoginBox() {

  const {
    handleSubmit,
    register,
  } = useForm()

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
        resolve()
      }, 0)
    })
  }

  return (
    <Box width="30%"display="flex" flexDirection="column" justifyContent="center" 
    alignItems="center" bg="white" marginTop="0.5%" borderRadius="10px">
      <div className='LoginDiv'>
        <Heading size='lg' marginBottom="10%">Welcome</Heading>
        <Image
                src="/src/images/logoUPM.png"
                alt='Logo UPM'
                width="35%"
                marginBottom="10%"
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel htmlFor='email'>Email address</FormLabel>
            <Input type='email' placeholder="Enter email" bg="white" {...register('email')}/>
          </FormControl>
          <FormControl>
          <FormLabel htmlFor='password'>Password</FormLabel>
            <PasswordInput field={'password'} register={register}></PasswordInput>
          </FormControl>
          <Button type="submit" width="35%" colorScheme='messenger' alignSelf="center" justifySelf="center" margin="10%" borderRadius="25px">Log in</Button>
        </form>
        <Text>Don't have an account? <a href='register.html'><b>Sign Up</b></a></Text>
      </div>
    </Box>
  )
}

