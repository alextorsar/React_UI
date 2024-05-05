import React from 'react';
import {
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    FormControl,
    FormLabel,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Box,
    ButtonGroup,
    Button
} from '@chakra-ui/react';



import { useForm } from 'react-hook-form';

import { useContext } from 'react';

import { ModelExecutionFormContext } from './ModelExecutionForm'

import '../NewModel/ModelForm.css'



const StartTime = () => {

    const context = useContext(ModelExecutionFormContext)

    const onSubmit = (values) => {
        context.setActiveStep(2)
        context.requestData['start_time'] = values['start_time']
        context.requestData['final_time'] = values['final_time']
        context.requestData['time_step'] = values['time_step']
        context.setRequestData(context.requestData)
    }

    const { register, handleSubmit, setValue, unregister} = useForm();

    return (
        <form className="ModelForm" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <FormControl marginBottom="auto" marginTop="auto" height="20%" minHeight="20%" maxHeight="20%" justifySelf='center' alignSelf='center' isRequired >
                <FormLabel htmlFor="start_time">Start time</FormLabel>
                <NumberInput
                    precision={4}
                    step={0.0001}
                    id="start_time"
                    name="start_time"
                    {...register("start_time")}
                    onChange={(valueString, valueNumber) => {
                        setValue("start_time", valueNumber);
                    }}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </FormControl>
            <FormControl marginBottom="auto" height="20%" minHeight="20%" maxHeight="20%" justifySelf='center' alignSelf='center' isRequired >
                <FormLabel htmlFor="start_time">Final time</FormLabel>
                <NumberInput
                    precision={4}
                    step={0.0001}
                    id="start_time"
                    name="start_time"
                    {...register("final_time")}
                    onChange={(valueString, valueNumber) => {
                        setValue("final_time", valueNumber);
                    }}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </FormControl>
            <FormControl marginBottom="auto" height="20%" minHeight="20%" maxHeight="20%" justifySelf='center' alignSelf='center' isRequired >
                <FormLabel htmlFor="start_time">Time Step</FormLabel>
                <NumberInput
                    precision={4}
                    step={0.0001}
                    id="start_time"
                    name="start_time"
                    {...register("time_step")}
                    onChange={(valueString, valueNumber) => {
                        setValue("time_step", valueNumber);
                    }}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </FormControl>
            <Stepper maxHeight="10%" minHeight="10%" height="10%" maxWidth="100%" minWidth="100%" width="100%" index={context.activeStep}>
                {context.steps.map((step, index) => (
                    <Step key={index}>
                        <StepIndicator>
                            <StepStatus
                                complete={<StepIcon />}
                                incomplete={<StepNumber />}
                                active={<StepNumber />}
                            />
                        </StepIndicator>
                        <Box flexShrink='0'>
                            <StepTitle>{step.title}</StepTitle>
                            <StepDescription>{step.description}</StepDescription>
                        </Box>
                        <StepSeparator/>
                    </Step>
                ))}
            </Stepper>
            <ButtonGroup maxHeight="10%" minHeight="10%" height="10%" width="100%" gap='2' display="flex" alignItems="center" justifyContent="center" margin="2.5">
                <Button type="submit" width="10%" colorScheme='messenger'>Next</Button>
            </ButtonGroup>
        </form>
    );
};

export default StartTime;
