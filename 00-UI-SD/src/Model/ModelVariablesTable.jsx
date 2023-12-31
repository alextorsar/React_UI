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

export function ModelVariablesTable({modelId}){
    const navigate = useNavigate()
    const [documentation,setDocumentation] = useState(null)

    useEffect( () => {
        getModelDocumentation(modelId).then(
          (response) => {
            if(response.status === 200){
                setDocumentation(response.data)
                console.log(response.data)
            }
          }
          ).catch((e) => {
            navigate('/login')
          });
      },[])
      return(
        <>
        {
            documentation ?
            <>
                <TableContainer  boxShadow="lg" height="65%" width="70%" borderRadius="10px">
                    <Table variant='simple' width="100%" colorScheme="messenger" >
                        <TableCaption>Model Variables</TableCaption>
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
                                <TableRow key = {variable['Real Name'].to} variable={variable}></TableRow>
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