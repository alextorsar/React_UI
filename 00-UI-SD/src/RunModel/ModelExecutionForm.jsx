import {
    Modal,
    extendTheme,
    ChakraProvider,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    ModalHeader
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

export function ModelExecutionForm({ isOpen, onClose }) {
    return(
        <ChakraProvider theme={theme}>
            <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay/>
                <ModalContent width="100%" height="80%" minHeight="80%" maxHeight="80%"  display="flex" alignItems="center">
                    <ModalHeader height="10%">Initial Conditions</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody width="100%" height="90%" minHeight="90%"  maxHeight="90%" display="flex" alignItems="center">

                    </ModalBody>
                </ModalContent>
            </Modal>
        </ChakraProvider>
    )
}