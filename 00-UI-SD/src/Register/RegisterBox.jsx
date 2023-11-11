import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Box,
    Heading,
    Text,
    VStack
  } from '@chakra-ui/react'

  import {PasswordInput} from "../Login/PassworInput"

  import './registerBox.css'


export function RegisterBox() {
    const {
        handleSubmit,
        register,
        watch,
        formState: { errors },
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

        <VStack width="30%" height="80%" display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center" bg="white" borderRadius="10px">
            <Heading size='lg' marginTop="5%" marginBottom="4%">Create an account</Heading>
                <VStack width="100%" height="90%"display="flex" flexDirection="column" justifyItems="flex-end" alignItems="center" bg="white" borderRadius="10px">
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl isRequired marginBottom="2.5%">
                        <FormLabel htmlFor='name'>Name</FormLabel>
                        <Input 
                            placeholder='Name'
                            bg="white"
                            {...register('name')}
                        />
                    </FormControl>
                    <FormControl isRequired marginBottom="2.5%">
                        <FormLabel htmlFor='username'>Username</FormLabel>
                        <Input 
                            placeholder='Username' 
                            bg="white"
                            {...register('username')}
                        />
                    </FormControl>
                    <FormControl isRequired marginBottom="2.5%">
                        <FormLabel htmlFor='email'>Email address</FormLabel>
                        <Input 
                            type='email'
                            placeholder="Enter email"
                            bg="white"
                            {...register('email')}
                        />
                    </FormControl>
                    <FormControl isRequired marginBottom="2.5%">
                        <FormLabel htmlFor='password'>Password</FormLabel>
                        <PasswordInput field={'password'} register={register}></PasswordInput>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel htmlFor='password2'>Repeat password</FormLabel>
                        <PasswordInput  field={'password2'} register={register}></PasswordInput>
                    </FormControl>
                    <Button  type="submit" width="35%" height="70%" colorScheme='messenger' alignSelf="center" justifySelf="flex-start" borderRadius="25px" marginTop="10%">Sign Up</Button>
                    </form>
                    <Text marginTop="auto" marginBottom="5%">Already have an account? <a href='index.html'><b>Log In</b></a></Text>
                </VStack> 
        </VStack>

    )
}