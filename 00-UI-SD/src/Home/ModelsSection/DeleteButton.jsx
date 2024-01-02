import {DeleteIcon} from '@chakra-ui/icons'
import { Button, useDisclosure,Modal, ModalOverlay,ModalContent, ModalHeader, ModalCloseButton, ModalBody,ModalFooter, useToast } from '@chakra-ui/react'
import { selectedModelsContext } from '../Logged.jsx'
import { useContext} from 'react'
import { deleteModel } from '../../../api/models-api.js'



export function DeleteButton(){
    const context = useContext(selectedModelsContext)
    var toast = useToast()
    if(context.selectedModels.length == 0){
        var visibility="hidden"
    }else{
        var visibility="visible"
    }
    const { isOpen, onOpen, onClose } = useDisclosure()
    function deleteModels() {
        var models = context.selectedModels
        var promises = []
        var correctlyDeletdModels = []
        models.forEach(model=> {
            var promise = deleteModel(model.id).then(
                (response) => {
                    if (response.status === 200){
                        correctlyDeletdModels.push(model.id)
                    }
                  }
            )
            promises.push(promise)
        })
        const modelPromises = Promise.all(promises).finally( 
            () => {
                var newSelectedModels = context.selectedModels.filter(
                    (model) => {
                        return !correctlyDeletdModels.includes(model.id);
                    }
                )
                var newModels = context.models.filter(
                    (model) => {
                        return !correctlyDeletdModels.includes(model.id);
                    }
                )
                context.setSelectedModels(
                    newSelectedModels
                )
                context.setModels(
                    newModels
                )
            }
        )
        toast.promise(modelPromises, {
            success: { title: 'Success', description: 'Models were deleted succesfully' },
            error: { title: 'Error', description: 'Something went wrong' },
            loading: { title: 'Deleting models', description: 'Please wait' },
        })
        onClose()
    }
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
                        <Button onClick={() => deleteModels()} colorScheme='red' margin="2.5%">Yes, delete.</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}