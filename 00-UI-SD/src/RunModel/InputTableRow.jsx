import {
    Tr,
    Td,
    Button,
    Stack,
    Text,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    extendTheme,
} from '@chakra-ui/react'

import {useState} from 'react'
import {VariableInput} from './VariableInput.jsx'
import { createPortal } from 'react-dom';


export function InputTableRow({variable, register, unregister, setValue}){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [inputValue, setInputValue] = useState(null)
    return(
        <>
            <Tr>
                <Td>{variable.getFormattedName()}</Td>
                <Td>{variable.getType()}</Td>
                <Td>{variable.getSubtype()}</Td>
                <Td>{variable.getUnits()}</Td>
                <Td>
                    <Stack display="flex" direction="row" justifyContent="center" alignItems="center">
                        <Text>{inputValue ? inputValue : "Default"}</Text>
                        <Button onClick={onOpen} colorScheme='messenger'>Edit</Button>
                    </Stack>
                </Td>
            </Tr>
            {isOpen && createPortal(
                    <Modal closeOnOverlayClick={false} size="md" isOpen={isOpen} onClose={onClose} isCentered>
                        <ModalOverlay />
                        <ModalContent width="100%"  display="flex" alignItems="center">
                            <ModalHeader paddingBottom="1%">
                                {variable.getFormattedName()}
                            </ModalHeader>
                            <VariableInput variable={variable.getName()} register={register} setInputValue={setInputValue} onClose={onClose} unregister={unregister} setValue={setValue}></VariableInput>
                        </ModalContent>
                    </Modal>,
                    document.body
            )}
        </>
        
    )
}