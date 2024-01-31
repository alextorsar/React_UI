import {
    Modal,
    extendTheme,
    ChakraProvider,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    ModalHeader,
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
    Box,
    Button,
    Stack,
    ButtonGroup,
} from '@chakra-ui/react';

const theme = extendTheme({
    components: {
        Modal: {
            baseStyle: (props) => ({
                dialog: {
                    height: '85%',
                    maxWidth: ['65%', '65%', '65%'],
                    minWidth: '65%',
                    maxHeight: ['85%', '85%', '85%'],
                    minHeight: '85%',
                },
            }),
        },
    },
});

const steps = [
    { title: 'Initial Conditions'},
    { title: 'Params'},
    { title: 'Run'}
]

export function ModelExecutionForm({ isOpen, onClose }) {
    const { activeStep, setActiveStep } = useSteps({
        index: 1,
        count: 3,
    })
    return(
        <ChakraProvider theme={theme}>
            <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay/>
                <ModalContent width="100%" height="80%" minHeight="80%" maxHeight="80%"  display="flex" alignItems="center">
                    <ModalHeader height="10%">Initial Conditions</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody width="100%" height="90%" minHeight="90%"  maxHeight="90%" display="flex" alignItems="center" justifyContent="center">
                    <Stack width="100%" height="100%" minHeight = "100%" maxHeight="100%" direction="column" display="flex" alignItems="center" justifyContent="flex-start">
                            <Box maxHeight="70%" minHeight="70%" height="70%"></Box>
                            <Stepper maxHeight="10%" minHeight="10%" height="10%" index={activeStep} width="80%">
                                {steps.map((step, index) => (
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
                                    <StepSeparator />
                                    </Step>
                                ))}
                            </Stepper>
                            <ButtonGroup maxHeight="10%" minHeight="10%" height="10%" width="100%" gap='2' display="flex" alignItems="center" justifyContent="center" margin="2.5">
                                {
                                    activeStep > 1 &&
                                    <Button width="10%" onClick={() => setActiveStep(activeStep - 1)}>Previous</Button>
                                }
                                {
                                    activeStep < 3   &&
                                    <Button width="10%" onClick={() => setActiveStep(activeStep + 1)} colorScheme='messenger'>{activeStep == 2? "Run" : "Next"}</Button>
                                }
                            </ButtonGroup>
                        </Stack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </ChakraProvider>
    )
}