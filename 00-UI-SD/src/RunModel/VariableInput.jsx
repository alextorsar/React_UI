import { 
    Stack,
    RadioGroup,
    Radio,
    ModalBody,
    ModalFooter,
    Button,
} from "@chakra-ui/react";

import {useState,useContext} from 'react'

import { ModelExecutionFormContext } from './ModelExecutionForm'
import { NumericInput } from "./NumericInput";
import { FunctionInput } from "./FunctionInput";   


export function VariableInput({variable, register, setInputValue, onClose, unregister, setValue}){
    const cancelInput = () => {
        unregister(variable['Real Name'])
        setInputValue(null)
        onClose()
    }

    const context = useContext(ModelExecutionFormContext)
    const [inputType, setInputType] = useState('Numeric')
    return(
        <>
            <ModalBody display="grid" width="100%" height="70%" minHeight="70%"  maxHeight="70%">
                <Stack width="100%" height="100%" minHeight="100%" direction="column" display="flex">
                    {
                        context.activeStep == 3 ?
                        <RadioGroup onChange={setInputType} value={inputType} alignSelf="center">
                            <Stack direction='row'>
                                <Radio value="Numeric">Numeric</Radio>
                                <Radio value="Function">Function</Radio>
                            </Stack>
                        </RadioGroup>
                        :
                        <></>
                    }
                    {inputType == 'Numeric' ?
                        <NumericInput variable={variable} register={register} setInputValue={setInputValue}></NumericInput>
                        :
                        <FunctionInput variable={variable} register={register} setInputValue={setInputValue}></FunctionInput>
                    }  
                </Stack>               
            </ModalBody>
            <ModalFooter width="100%" height="10%" minHeight="10%"  maxHeight="10%" display="flex" alignItems="center" justifyContent="center">
                <Button variant='ghost' onClick={cancelInput}>Cancel</Button>
                <Button colorScheme='messenger' mr={3} onClick={onClose}>
                    Change value
                </Button>
            </ModalFooter>
        </>
    )
}