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
    Box,
    Button,
    ButtonGroup,
} from '@chakra-ui/react';

import { useForm } from 'react-hook-form';

import { useContext } from "react"

import { ModelExecutionFormContext } from './ModelExecutionForm'

import {ModelVariablesInputTable} from './ModelVariablesInputTable'

import '../NewModel/ModelForm.css'

export function InitialConditionsWindow({model}){ 


    const { register, handleSubmit, setValue, unregister,formState } = useForm();
    const context = useContext(ModelExecutionFormContext)
    
    const cancelSubmit = () => {
        unregister('initial_condition')
        context.setActiveStep(1)
    }

    const onSubmit = (values) => {
        let keys = Object.keys(values)
        for(let i=0; i < keys.length; i++){
            let key = keys[i];
            context.requestData['initial_condition'][key]=values[key]
        }
        context.setRequestData(context.requestData)
        context.setActiveStep(3)
    }
    
    return(
        <form className="ModelForm" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <ModelVariablesInputTable window="initial_conditions" model={model} register={register} unregister={unregister} setValue={setValue}></ModelVariablesInputTable>
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
                <Button width="10%" onClick={cancelSubmit}>Previous</Button>
                <Button type="submit" width="10%" colorScheme='messenger'>Next</Button>
            </ButtonGroup>
        </form>
    )
}