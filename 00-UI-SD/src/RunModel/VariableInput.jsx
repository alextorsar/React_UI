import { 
    Stack,
    RadioGroup,
    Radio,
    ModalBody,
    ModalFooter,
    Button
} from "@chakra-ui/react";

import {useState,useContext} from 'react'

import { ModelExecutionFormContext } from './ModelExecutionForm'
import { NumericInput } from "./NumericInput";
import { FunctionInput } from "./FunctionInput";    

export function VariableInput({variable, register, setInputValue, onClose, unregister, setValue}){
    const cancelIntegerInput = () => {
        unregister(variable['Real Name'])
        setInputValue(null)
        onClose()
    }
    const cancelFunctionInput = () => {
        unregister(variable['Real Name'])
        setFunctionObject({})
        onClose()
    }

    const functionSubmit = () => {
        console.log(functionObject)
        setInputValue("Custom Function")
    }

    const context = useContext(ModelExecutionFormContext)
    const [inputType, setInputType] = useState('Numeric')
    const [functionObject, setFunctionObject] = useState({})
    return(
        <>
            <ModalBody width="100%" height="60%" minHeight="60%"  maxHeight="60%" display="flex" alignItems="center" justifyContent="center">
                <Stack width="100%" height="100%" minHeight = "100%" maxHeight="100%" direction="column" display="flex" alignItems="center" justifyContent="center">
                    {
                        context.activeStep == 3 ?
                        <RadioGroup onChange={setInputType} value={inputType}>
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
                        <FunctionInput functionObject={functionObject} setFunctionObject={setFunctionObject}></FunctionInput>
                    }  
                </Stack>               
            </ModalBody>
            <ModalFooter width="100%" height="10%" minHeight="10%"  maxHeight="10%" display="flex" alignItems="center" justifyContent="center">
                <Button variant='ghost' onClick={inputType == "Numeric" ? cancelIntegerInput : cancelFunctionInput}>Cancel</Button>
                <Button colorScheme='messenger' mr={3} onClick={inputType == "Numeric" ? onClose : functionSubmit}>
                    Change value
                </Button>
            </ModalFooter>
        </>
    )
}