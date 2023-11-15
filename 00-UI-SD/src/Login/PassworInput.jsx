import React from 'react'
import { Input, InputRightElement, InputGroup, Button} from '@chakra-ui/react'
export function PasswordInput({register, errors}) {

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    return (
      <InputGroup size='md'>
        <Input
           placeholder={errors?.message} 
           _placeholder={{ color: 'red' }}
          pr='4.5rem'
          type={show ? 'text' : 'password'}
          bg = "white"
          {...register}
        />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleClick} margin="0.5%">
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
    )
  }