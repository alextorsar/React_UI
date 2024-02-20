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
        context.setRequestData(context.requestData)
    }

    const { register, handleSubmit, setValue, unregister} = useForm();

    return (
        <form className="ModelForm" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <FormControl height="80%" minHeight="80%" maxHeight="80%" isRequired>
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
