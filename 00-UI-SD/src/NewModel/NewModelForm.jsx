import { useForm } from 'react-hook-form';
import { useContext } from 'react'
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

import { selectedModelsContext } from '../Home/Logged'

import { Uploader } from './Uploader';
import { postModel } from '../../api/models-api'

import './NewModelForm.css'

const theme = extendTheme({
  components: {
    Modal: {
      baseStyle: (props) => ({
        dialog: {
          maxWidth: ['65%', '65%', '65%'],
          minWidth: '65%',
          maxHeight: ['55%', '55%', '55%'],
          minHeight: '55%',
        },
      }),
    },
  },
});

export function NewModelForm({ isOpen, onClose }) {

  var toast = useToast()

  const context = useContext(selectedModelsContext)

  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = (values) => {
    const promise = postModel(values).then(
      (response) => {
          if (response.status === 200){
              const model = response.data 
              context.setModels([...context.models, model])
          }
          toast.promise(promise, {
            success: { title: 'Success', description: 'Model created succesfully' },
            error: { title: 'Error', description: 'Something went wrong' },
            loading: { title: 'Creating model', description: 'Please wait' },
          })
          onClose()
      }
  )
  };

  return (
    <ChakraProvider theme={theme}>
      <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent width="100%" height="100%" display="flex" alignItems="center">
          <ModalHeader height="20%">Create a model</ModalHeader>
          <ModalCloseButton />
          <ModalBody width="100%" height="80%" display="flex" alignItems="center">
            <form className="newModelForm" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
              <Stack width="100%" height = "100%" spacing="5%" direction="column" display="flex" alignItems="center" justifyContent="flex-start">
                <FormControl display="flex" flexDirection="column" alignItems="center">
                  <FormLabel htmlFor="name">Nombre</FormLabel>
                  <Input
                    id="name"
                    {...register('name', { 
                      required: 'Este campo es requerido'
                    })}
                  />
                </FormControl>
                <Stack height="40%" width="95%" direction="row">
                  <FormControl display="flex" flexDirection="column" alignItems="center">
                    <FormLabel htmlFor="image">Model Image</FormLabel>
                    <Uploader name="image" register={register} setValue={setValue} />
                  </FormControl>
                  <FormControl display="flex" flexDirection="column" alignItems="center">
                    <FormLabel htmlFor="file">Model File</FormLabel>
                    <Uploader name="file" register={register} setValue={setValue} />
                  </FormControl>
                  <FormControl display="flex" flexDirection="column" alignItems="center">
                    <FormLabel htmlFor="file">Submodels</FormLabel>
                    <Uploader name="submodels" register={register} setValue={setValue} />
                  </FormControl>
                </Stack>
                <Stack
                  height="20%"
                  direction="row"
                  spacing="24px"
                  display="flex"
                  justifyContent="center"
                  alignContent="center"
                  alignItems="center"
                >
                  <Button margin="2.5%" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" margin="2.5%" colorScheme="messenger" mr={3}>
                    Create model
                  </Button>
                </Stack>
              </Stack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
}
