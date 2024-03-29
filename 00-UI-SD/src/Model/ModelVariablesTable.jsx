import { useState, useEffect } from "react"
import { getModelDocumentation } from "../../api/models-api"
import {TableRow} from './TableRow'

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'

import { useNavigate } from "react-router-dom";

export function ModelVariablesTable({model}){
    const navigate = useNavigate()
    const [documentation,setDocumentation] = useState(model.getVariables())
    useEffect( () => {
        setDocumentation(model.getVariables())
        if(documentation === null){
            navigate('/login')
        }
    },[])
    return(
        <>
        {
            documentation ?
            <>
                <TableContainer  marginBottom="5%" boxShadow="lg" height="auto" width="80%" borderRadius="10px">
                    <Table variant='unstyled' width="100%" height="auto" colorScheme="messenger" >
                        <Thead bgColor="#0078FF">
                        <Tr>
                            <Th color="white">Name</Th>
                            <Th color="white">Comment</Th>
                            <Th color="white">Type</Th>
                            <Th color="white">Subtype</Th>
                            <Th color="white">Units</Th>
                        </Tr>
                        </Thead>
                        <Tbody bgColor="#F8F8F8">
                        {
                            documentation.map((variable) => (
                                <TableRow key = {variable.getId()} variable={variable}></TableRow>
                            ))
                        }
                        </Tbody>
                    </Table>
                </TableContainer>
            </>
            :
            <></>
        }
        </>
    )
}