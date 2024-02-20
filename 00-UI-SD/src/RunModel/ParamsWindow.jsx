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

import { useNavigate} from "react-router-dom";

import { useContext } from "react"

import { useForm } from 'react-hook-form';

import { ModelExecutionFormContext } from './ModelExecutionForm'

import {ModelVariablesInputTable} from './ModelVariablesInputTable'

import '../NewModel/ModelForm.css'

export function ParamsWindow({model}){

    const navigate = useNavigate();

    const { register, handleSubmit, setValue, unregister,formState } = useForm();
    const context = useContext(ModelExecutionFormContext)

    const cancelSubmit = () => {
        unregister('params')
        context.setActiveStep(2)
    }

    const onSubmit = (values) => {
        let keys = Object.keys(values)
        for(let i=0; i < keys.length; i++){
            let key = keys[i];
            context.requestData['params'][key]=values[key]
        }
        context.setRequestData(context.requestData)
        navigate(`/run/${model.getModelId()}/`, { state:  context.requestData })
    }

    return(
        <form className="ModelForm" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <ModelVariablesInputTable model={model} register={register} unregister={unregister} setValue={setValue}></ModelVariablesInputTable>
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
                <Button width="10%" type='submit' colorScheme='messenger'>Run</Button>
            </ButtonGroup>
        </form>
    )
}