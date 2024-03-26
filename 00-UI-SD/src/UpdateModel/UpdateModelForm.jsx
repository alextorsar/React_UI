import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    extendTheme,
    ChakraProvider,
    Stack,
    FormControl,
    FormLabel,
    Input,
    useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import {UpdateUploader} from './UpdateUploader'
import {UpdateMultipleUploader} from './UpdateMultipleUploader'
import '../NewModel/ModelForm.css'
import { updateModel, getModel, getModelDocumentation } from '../../api/models-api'
import {SDModel} from '../Model/ModelClasses'

export function UpdateModelForm({ isOpen, onClose, model, setModel }) {
    const { register, handleSubmit, setValue, unregister,formState } = useForm();
    const { errors } = formState
    var toast = useToast()

    const onSubmit = (values) => {
        const promise = updateModel(values,model.getModelId())
        var toastId = toast(
            {
                status:'loading', title: 'Updating model', description: 'Please wait'
            }
        )
        promise.then(
            (response) => {
                if (response.status === 200){
                    toast.update(toastId, {status: 'success', title: 'Success', description: 'Model was updated successfully'})
                    getModel(model.getModelId()).then(
                        (modelResponse) => {
                            if(modelResponse.status === 200){
                                getModelDocumentation(model.getModelId()).then(
                                (variablesResponse) => {
                                    if(variablesResponse.status === 200){
                                        setModel(new SDModel(modelResponse.data,variablesResponse.data))
                                    }
                                }
                                )
                            }
                        }
                    )
                }
            }
        )
        promise.catch(
            (errors) => {
                var errorMessage = Object.values(errors.response.data)[0]
                toast.update(toastId, {status: 'error', title: 'Error', description: errorMessage})
            }
        )
        onClose()
        unregister(["name","image","file"])
    }
    const theme = extendTheme({
        components: {
            Modal: {
                baseStyle: (props) => ({
                    dialog: {
                        maxWidth: ['60%', '60%', '60%'],
                        minWidth: ['60%', '60%', '60%'],
                        maxHeight: ['40%', '40%', '40%'],
                        minHeight: ['40%', '40%', '40%'],
                    },
                }),
            },
        },
    });
    return(
        <ChakraProvider theme={theme}>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay/>
                <ModalContent width="100%" height="80%" minHeight="80%" maxHeight="80%"  display="flex" alignItems="center">
                    <ModalHeader height="10%">Update model</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody width="100%" height="90%" minHeight="90%"  maxHeight="90%" display="flex" alignItems="center">
                        <form className="ModelForm" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                            <Stack width="100%" height="100%" minHeight = "100%" maxHeight="100%" direction="column" display="flex" alignItems="center" justifyContent="flex-start">
                                <FormControl height="15%" minHeight="15%" maxHeight="15%" display="flex" flexDirection="column" alignItems="center">
                                    <FormLabel htmlFor="name">Name</FormLabel>
                                    <Input
                                        placeholder={model.name} 
                                        id="name"
                                        {...register('name', { 
                                        pattern: /^[a-zA-Z0-9_ ]+$/
                                        })}
                                        width="90%"
                                    />
                                </FormControl>
                                <Stack height="30%" minHeight="30%" maxHeight="30%" width="95%" direction="row" >
                                    <FormControl display="flex" flexDirection="column" alignItems="center">
                                        <FormLabel height="15%" minHeight="15%" maxHeight="15%" htmlFor="image">Model Image</FormLabel>
                                        <UpdateUploader height="85%" minHeight="85%" maxHeight="85%" name="image" register={register} unregister={unregister} setValue={setValue} errors={errors.image} model={model}/>
                                    </FormControl>
                                    <FormControl display="flex" flexDirection="column" alignItems="center">
                                        <FormLabel height="15%" minHeight="15%" maxHeight="15%" htmlFor="file">Model File</FormLabel>
                                        <UpdateUploader height="85%" minHeight="85%" maxHeight="85%" name="file" register={register} unregister={unregister} setValue={setValue} errors={errors.file} model={model}/>
                                    </FormControl>
                                </Stack>
                                <FormControl  marginTop="5%" height="30%" minHeight="30%" maxHeight="30%" display="flex" flexDirection="column" alignItems="center">
                                    <FormLabel htmlFor="file">Submodels</FormLabel>
                                    <UpdateMultipleUploader name="submodels" register={register} unregister={unregister}/>
                                </FormControl>
                                <Stack
                                    height="15%"
                                    minHeight="17%"
                                    maxHeight="17%"
                                    direction="row"
                                    display="flex"
                                    justifyContent="center"
                                    alignContent="center"
                                    alignItems="center"
                                >
                                    <Button margin="2.5%" onClick={onClose}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" margin="2.5%" colorScheme="messenger" mr={3}>
                                        Update model
                                    </Button>
                                </Stack>
                            </Stack>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </ChakraProvider>
    )
}