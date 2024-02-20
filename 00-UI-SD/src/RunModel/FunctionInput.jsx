import React from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    NumberInput, 
    NumberInputField, 
    NumberInputStepper, 
    NumberIncrementStepper, 
    NumberDecrementStepper,
    Stack,
    Table,
    TableContainer,
    Thead,
    Tr,
    Th,
    Tbody,
    Td // New import
} from '@chakra-ui/react';

import { useState } from 'react';

export function FunctionInput({ functionObject, setFunctionObject}) {

    const [xValue, setXValue] = useState(null)
    const isXError = xValue === null
    const [yValue, setYValue] = useState(null)
    const isYError = yValue === null
    const [xValuesArray, setXValuesArray] = useState([])

    const addPairOfValues = () => {
        if (xValue !== null && yValue !== null){
            if(!(xValue in functionObject)){
                functionObject[xValue] = yValue
                setFunctionObject(functionObject)
                setXValuesArray([...xValuesArray, xValue])
            }
        }
    }
    
    return (
        <>
            <TableContainer  marginBottom="5%" boxShadow="lg" height="auto" width="60%" borderRadius="10px" overflowY="scroll">
                        <Table variant='unstyled' width="100%" height="auto" colorScheme="messenger" >
                            <Thead bgColor="#0078FF">
                            <Tr width="100%">
                                <Th color="white" >X Values</Th>
                                <Th color="white" >Y values</Th>
                            </Tr>
                            </Thead>
                            <Tbody bgColor="#F8F8F8">
                            {
                                xValuesArray.map((xValue, index) => {
                                    return (
                                        <Tr key={index}>
                                            <Td>{xValue}</Td>
                                            <Td>{functionObject[xValue]}</Td>
                                        </Tr>
                                    )
                                })
                            }
                            </Tbody>
                        </Table>
                    </TableContainer>
            <Stack direction="row" display="flex" alignItems="center" justifyContent="center">
                <FormControl width="35%" minWidth="35%" maxWidth="35%" isInvalid={isXError}>
                    <FormLabel>X value</FormLabel>
                    <NumberInput precision={4} step={0.0001} id="xValue" name="xValue"
                        onChange={(valueString, valueNumber) => {if (valueNumber) setXValue(valueNumber)}}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl >
                <FormControl width="35%" minWidth="35%" maxWidth="35%" isInvalid={isYError}>
                    <FormLabel>Y value</FormLabel>
                    <NumberInput precision={4} step={0.0001} id="yValue" name="yValue"
                        onChange={(valueString, valueNumber) => {if (valueNumber) setYValue(valueNumber)}}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                <Button marginTop="auto" width="20%" minWidth="20%" maxWidth="20%" colorScheme='messenger' onClick={addPairOfValues}>Add pair</Button>
            </Stack>
        </>
    );
}