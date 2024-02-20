import {
    Tr,
    Td
} from '@chakra-ui/react'

export function TableRow({variable}){
    return(
        <Tr>
            <Td>{variable.getFormattedName()}</Td>
            <Td>{variable.getComment()}</Td>
            <Td>{variable.getType()}</Td>
            <Td>{variable.getSubtype()}</Td>
            <Td>{variable.getUnits()}</Td>
        </Tr>
        
    )
}