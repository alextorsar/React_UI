import React, {useContext} from 'react'
import {Box, Heading, Divider, Select, Checkbox} from '@chakra-ui/react';
import { selectedVariablesContext } from './RunModelResult'


export function VariablesMenu(){
    const {executedModel, selectedVariables, setSelectedVariables, setNumberOfCharts} = useContext(selectedVariablesContext)
    return(
        <Box display="flex" flexDirection="column" height="auto" width="30%" backgroundColor="white" alignContent="center" alignItems="center" overflowY="scroll">
            <Heading margin="2.5%" size='sm'>Number of charts</Heading>
            <Divider width="90%"/>
            <Select  margin="2.5%" width="85%" onChange={(event)=>{setNumberOfCharts(event.target.value)}}>
                <option value='Single'>All variables in one chart</option>
                <option value='Multiple'>One chart per variable</option>   
            </Select>
            <Heading margin="2.5%" justifySelf="center" size='sm'>Variables</Heading>
            <Divider width="90%"/>
            {
                executedModel.getTypesOfVariables().map((type) => {
                    return (
                        <Box display="flex" flexDirection="column" alignItems="center"width="100%" key={type}>
                            <Heading margin="2.5%" color="#696969" size="sm">{type}</Heading>
                            <Box margin='2.5%' width="85%" display="flex" flexDirection="column" border='1px' borderColor='gray.200' borderRadius='10px'>
                            {
                                executedModel.getVariablesOfType(type).map((variable) => {
                                    return (
                                        <Checkbox 
                                            key={variable.getId()}
                                            id={variable.getId()}
                                            margin="2.5%" 
                                            onChange={
                                                ()=>{
                                                    var checkbox = document.getElementById(variable.getId())
                                                    if (checkbox.checked){
                                                        var label = variable.getName()
                                                        if (variable.getUnits() != null){
                                                            label = label + ' (' + variable.getUnits() + ')'
                                                        }
                                                        setSelectedVariables([...selectedVariables, {label: label, data: variable.getData(), id: variable.getId()}])
                                                    }else{
                                                        var restOfVariables = selectedVariables.filter((selectedVariable) => selectedVariable.id != variable.getId());
                                                        setSelectedVariables(restOfVariables)
                                                    } 
                                                }
                                            }
                                            defaultChecked={type === 'Stateful' ? true : false}
                                        >
                                            {variable.getFormattedName()}
                                        </Checkbox>
                                    )
                                })
                            }
                            </Box>
                        </Box>
                    )
                })
            }
        </Box>
    )
}