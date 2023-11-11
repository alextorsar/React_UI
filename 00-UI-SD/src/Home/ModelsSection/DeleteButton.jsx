import {DeleteIcon} from '@chakra-ui/icons'
import { Button, useDisclosure,Modal, ModalOverlay,ModalContent, ModalHeader, ModalCloseButton, ModalBody,ModalFooter } from '@chakra-ui/react'
import { selectedModelsContext } from '../../logged.jsx'
import { useContext} from 'react'


export function DeleteButton(){
    const context = useContext(selectedModelsContext)
    if(context.selectedModels.length == 0){
        var visibility="hidden"
    }else{
        var visibility="visible"
    }
    const { isOpen, onOpen, onClose } = useDisclosure()
    return(
        <>
            <Button leftIcon={<DeleteIcon />} colorScheme='red' visibility={visibility} onClick={onOpen}>
                Delete models
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}  isCentered>
                <ModalOverlay />
                <ModalContent display="flex" alignItems="center">
                    <ModalHeader display="flex" justifyContent="center">Are you sure?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                        You are going to delete {context.selectedModels.length} models.
                        Are you sure?
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose} margin="2.5%">No, keep them.</Button>
                        <Button colorScheme='red' margin="2.5%">Yes, delete.</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}