import React, {useContext} from 'react'
import {Tooltip, createMultiStyleConfigHelpers, ChakraProvider, Box, Heading, Divider, Select, Checkbox,Accordion,AccordionItem,AccordionButton,AccordionPanel,AccordionIcon,extendTheme} from '@chakra-ui/react';
import { selectedVariablesContext } from './RunModelResult'
import { accordionAnatomy } from '@chakra-ui/anatomy'

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(accordionAnatomy.keys)

const baseStyle = definePartsStyle({
    container: {
        border: 'white'
    },
})
const accordionTheme = defineMultiStyleConfig({ baseStyle })

const theme = extendTheme({
    components: { Accordion: accordionTheme },
})

function isCustomFunction(param){
    return param.length != undefined
}


export function VariablesMenu({requestData}){
    const {executedModel, selectedVariables, setSelectedVariables, setNumberOfCharts} = useContext(selectedVariablesContext)
    return(
        <Box display="flex" flexDirection="column" height="auto" width="33%" backgroundColor="white" alignContent="center" alignItems="center" overflowY="scroll">
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
                            <ChakraProvider theme={theme}>
                                    <Accordion allowMultiple>
                                    {
                                        executedModel.getVariablesOfType(type).map((variable) => {
                                            var initialCondition = "Default"
                                            var param = "None"
                                            if(variable.getName() in requestData.initial_condition){
                                                initialCondition = requestData.initial_condition[variable.getName()]
                                            }
                                            if(variable.getName() in requestData.params){
                                                if(isCustomFunction(requestData.params[variable.getName()])){
                                                    param = "Custom Function"
                                                }else{
                                                    param = requestData.params[variable.getName()]
                                                }
                                            }
                                            return (
                                                <Tooltip label={variable.getFormattedName()} aria-label="A tooltip">
                                                    <AccordionItem key={variable.getId()} minWidth="100%" maxWidth="100%" width="100%">
                                                        <AccordionButton>
                                                            <Checkbox 
                                                                key={variable.getId()}
                                                                id={variable.getId()}
                                                                margin="2.5%"
                                                                overflow="hidden"                                                        onChange={
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
                                                            <AccordionIcon/>
                                                        </AccordionButton>
                                                        <AccordionPanel>
                                                            <b>Initial Value:</b> {initialCondition} <b>Param:</b>  {param}
                                                        </AccordionPanel>
                                                    </AccordionItem>
                                                </Tooltip>
                                            )
                                        })
                                    }
                                    </Accordion>
                                </ChakraProvider>
                            </Box>
                        </Box>
                    )
                })
            }
        </Box>
    )
}