import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { postUser } from '../../api/users-api'
import { Link, useNavigate } from "react-router-dom";

import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Heading,
    Text,
    VStack,
    useToast
  } from '@chakra-ui/react'

  import {PasswordInput} from "../Login/PassworInput"

  import './registerBox.css'


export function RegisterBox() {
    const toast = useToast()
    const navigate = useNavigate();
    const {
        handleSubmit,
        formState,
        register,
        watch,
      } = useForm()

    const { errors } = formState

      function onSubmit(values) {
        
        const promise = postUser(values).then(
            (response) => {
                if (response.status === 200){
                    navigate("/login");
                }
            }
        )
        promise.catch(
            (error) => {
                var error 
                if ("username" in error.response.data) 
                    error = "Username already in use"
                else if ("email" in error.response.data)
                    error = "Email already in use"
                toast.promise(promise, {
                    error: { title: 'Register failed', description: error, duration: 3000,isClosable: true}
                })
            }
        )
      }

    const password = watch('password', '');
    const password2 = watch('password2', '');
      
    return (

        <VStack width="30%" height="80%" display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center" bg="white" borderRadius="10px">
            <Heading size='lg' marginTop="5%" marginBottom="4%">Create an account</Heading>
                <VStack width="100%" height="100%"display="flex" flexDirection="column" justifyItems="flex-end" alignItems="center" bg="white" borderRadius="10px">
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl marginBottom="2.5%">
                        <FormLabel htmlFor='name'>Name</FormLabel>
                        <Input 
                            placeholder={errors.name?.message} 
                            _placeholder={{ color: 'red' }}
                            bg="white"
                            {...register('name', {required: "Name is required." })}
                        />
                    </FormControl>
                    <FormControl marginBottom="2.5%">
                        <FormLabel htmlFor='username'>Username</FormLabel>
                        <Input 
                            placeholder={errors.username?.message} 
                            _placeholder={{ color: 'red' }}
                            bg="white"
                            {...register('username', {required: "Username is required." })}
                        />
                    </FormControl>
                    <FormControl marginBottom="2.5%">
                        <FormLabel htmlFor='email'>Email address</FormLabel>
                        <Input 
                            placeholder={errors.email?.message} 
                            _placeholder={{ color: 'red' }}
                            type='email'
                            bg="white"
                            {...register('email', {required: "Email is required." })}
                        />
                    </FormControl>
                    <FormControl marginBottom="2.5%">
                        <FormLabel htmlFor='password'>Password</FormLabel>
                        <PasswordInput  
                            register={register('password',{required: "Password is required." })} 
                            errors={errors.password}>
                        </PasswordInput>
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='password2'>Repeat password</FormLabel>
                        <PasswordInput  
                            register={
                                register(
                                    'password2', 
                                    {
                                        required: "Password is required.",
                                        validate: value => value === password || "Passwords do not match."
                                    }
                                )
                            }
                            errors={errors.password2}>
                        </PasswordInput>
                        {errors.password2 && errors.password2.type === 'validate' && (
                            <Text color='red'>
                                {errors.password2.message}
                            </Text>
                        )}
                    </FormControl>
                    <Button  type="submit" width="35%" height="40px" colorScheme='messenger' alignSelf="center" justifySelf="flex-start" borderRadius="25px" marginTop="10%">Sign Up</Button>
                    </form>
                    <Text marginBottom="5%">Already have an account? <Link to='/login'><b>Log In</b></Link></Text>
                </VStack> 
        </VStack>
    )
}