import React from 'react';
import {
    FormControl,
    FormLabel,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react';


export function NumericInput({ variable, register, setInputValue }) {
    return (
        <FormControl>
            <FormLabel htmlFor={variable}>Value</FormLabel>
            <NumberInput precision={4} step={0.0001} id={variable} name={variable} {...register(variable, {valueAsNumber: true})} onChange={(valueString, valueNumber) => {
                setInputValue(valueNumber);
            }}>
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
        </FormControl>
    );
}