import {
    Modal,
    extendTheme,
    ChakraProvider,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    ModalHeader,
    useSteps,
    Stack,
    Text
} from '@chakra-ui/react';

import { createContext, useState } from "react"

import {InitialConditionsWindow} from "./InitialConditionsWindow"
import {ParamsWindow} from "./ParamsWindow"
import StartTime from './StartTime';

const theme = extendTheme({
    components: {
        Modal: {
            sizes: {
                xl: {
                    dialog: {
                        maxWidth: ['60%', '60%', '60%'],
                        minWidth: ['60%', '60%', '60%'],
                        maxHeight: ['40%', '40%', '40%'],
                        minHeight: ['40%', '40%', '40%'],
                    }
                },
                md: {
                    dialog: {
                        maxWidth: ['40%', '40%', '40%'],
                        minWidth: ['40%', '40%', '40%'],
                        maxHeight: ['50%', '50%', '50%'],
                        minHeight: ['50%', '50%', '50%'],
                    }
                },
            },
        },
    },
});

const steps = [
    { title: 'Start time'},
    { title: 'Initial Conditions'},
    { title: 'Params'},
    { title: 'Run'}
]

export const ModelExecutionFormContext = createContext()


export function ModelExecutionForm({ isOpen, onClose, model }) {

    const { activeStep, setActiveStep } = useSteps({
        index: 1,
        count: 4,
    })

    const closeModal = () => {
        onClose()
        setActiveStep(1)
        requestDataObject = new Object()
        requestDataObject['initial_condition'] = new Object()
        requestDataObject['params'] = new Object()
        setRequestData(requestDataObject) 
    }
    
    

    var requestDataObject = new Object()
    requestDataObject['initial_condition'] = new Object()
    requestDataObject['params'] = new Object()
    const [requestData, setRequestData] = useState(requestDataObject) 

    return(
        <ChakraProvider theme={theme}>
            <Modal size="xl" isOpen={isOpen} onClose={closeModal} isCentered>
                <ModalOverlay/>
                <ModalContent width="100%" height="80%" minHeight="80%" maxHeight="80%"  display="flex" alignItems="center">
                    <ModalHeader height="10%">{activeStep == 1 ? "Start time" : activeStep == 2 ? "Initial conditions" : "Params"}</ModalHeader>
                    {activeStep == 1 ? <Text alignSelf="center" size='md' color="#696969">Set the simulation specifications</Text>:<></>}
                    
                    <ModalCloseButton />
                    <ModalBody width="100%" height={activeStep == 1 ? "85%" : "90%"} minHeight={activeStep == 1 ? "85%" : "90%"}  maxHeight={activeStep == 1 ? "85%" : "90%"} display="flex" alignItems="center" justifyContent="center">
                        <Stack width="100%" height="100%" minHeight = "100%" maxHeight="100%" direction="column" display="flex" alignItems="center" justifyContent="flex-start">
                            <ModelExecutionFormContext.Provider value={{steps,activeStep,setActiveStep,requestData,setRequestData}}>
                                {
                                    activeStep == 1 &&
                                    <StartTime />
                                }
                                {
                                    activeStep == 2 &&
                                    <InitialConditionsWindow model={model}/>
                                }
                                {
                                    activeStep == 3 &&
                                    <ParamsWindow model={model}/>
                                }
                            </ModelExecutionFormContext.Provider>
                        </Stack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </ChakraProvider>
    )
}