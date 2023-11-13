import './Login.css'
import './LoginBox.css'
import { Link, useNavigate} from "react-router-dom";
import React from 'react'
import {PasswordInput} from "./PassworInput"
import {postLogin} from '../../api/users-api'
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

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
  } = useForm()

  function onSubmit(values) {
    postLogin(values).then(
      (response) => {
        if (response.status === 200){
          navigate("/logged");
        }else{
          console.log(response)
        }
      }
    )
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
        <Text>Don't have an account? <Link to="/register"><b>Sign Up</b></Link></Text>
      </div>
    </Box>
  )
}

