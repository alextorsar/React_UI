import { useState, useEffect } from "react"
import { getModelDocumentation } from "../../api/models-api"
import {InputTableRow} from './InputTableRow'

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    TableContainer,
    ChakraProvider,
    extendTheme
} from '@chakra-ui/react'

import { useNavigate } from "react-router-dom";
import { Key } from "@mui/icons-material";


export function ModelVariablesInputTable({window, model, register, unregister, setValue}){
    const navigate = useNavigate()
    const [documentation,setDocumentation] = useState(null)

    useEffect( () => {
        if(window == 'params'){
            setDocumentation(model.getVariables())
        }else{
            setDocumentation(model.getVariablesOfType('Stateful'))
        }
        
    },[])
    return(
        <>
        {
            documentation ?
                <TableContainer  marginBottom="auto" marginTop="auto" boxShadow="lg" height="auto" width="90%" borderRadius="10px" overflowY="scroll">
                    <Table variant='unstyled' width="100%" height="auto" colorScheme="messenger" >
                        <Thead bgColor="#0078FF">
                        <Tr width="100%">
                            <Th display="flex" color="white" justifyContent="center">Name</Th>
                            <Th color="white">Type</Th>
                            <Th color="white">Subtype</Th>
                            <Th color="white">Units</Th>
                            <Th display="flex" color="white" justifyContent="center">Value</Th>
                        </Tr>
                        </Thead>
                        <Tbody bgColor="#F8F8F8">
                        {
                            
                            documentation.map((variable) => (
                                <>
                                    {
                                        ((variable.getName() !== "Time")&&(variable.getName() !== "INITIAL TIME")) ? 
                                            <InputTableRow key = {variable.getId()} variable={variable} register={register} unregister={unregister} setValue={setValue}></InputTableRow>
                                        : 
                                            <></>
                                    }
                                </>
                            ))
                        }
                        </Tbody>
                    </Table>
                </TableContainer>
            :
            <></>
        }
        </>
    )  
}