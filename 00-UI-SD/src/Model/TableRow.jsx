import {
    Tr,
    Td
  } from '@chakra-ui/react'

export function TableRow({variable}){
    return(
        <Tr>
            <Td>{variable['Real Name']}</Td>
            <Td>{variable['Comment']}</Td>
            <Td>{variable['Type']}</Td>
            <Td>{variable['Subtype']}</Td>
            <Td>{variable['Units']}</Td>
        </Tr>
        
    )
}