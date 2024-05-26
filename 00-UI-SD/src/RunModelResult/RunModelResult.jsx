import { useParams,useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, createContext } from 'react'
import {  getModelExecutionResult } from '../../api/models-api'
import { getUser } from '../../api/users-api'
import {Box, Stack, ChakraProvider, Heading, Text } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import {NavBarLogged} from '../Home/LoggedNavBar/NavBarLogged'
import { 
    Chart as ChartJS,
    LineElement,
    CategoryScale, 
    LinearScale,
    PointElement,
    Legend,
    Tooltip,
} from 'chart.js'
import {ExecutedModel} from './ExecutedModelClasses'
import autocolors from 'chartjs-plugin-autocolors';
import { VariablesMenu } from './VariablesMenu';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, autocolors, Tooltip)

export const selectedVariablesContext = createContext()

export function RunModelResult(){
    const {state} = useLocation();   
    const [executedModel, setExecutedModel] = useState(null)
    const [selectedVariables, setSelectedVariables] = useState(null)
    const [user,setUser] = useState({})
    const [numberOfCharts, setNumberOfCharts] = useState('Single')
    const modelId = useParams().modelId
    const navigate = useNavigate()
    const plugins = [
        {
            id: 'hoverLine',
            afterDatasetsDraw(chart, args, options) {
                const {
                    ctx, 
                    tooltip, 
                    chartArea: {top, bottom, left, right, width, height},
                    scales: {x, y},
                } = chart;
                if (tooltip._active.length > 0) {
                    const xCoor = x.getPixelForValue(tooltip.dataPoints[0].dataIndex);
                    const yCoor = y.getPixelForValue(tooltip.dataPoints[0].parsed.y);
                    ctx.save();
                    ctx.beginPath();
                    ctx.lineWidth = 1.5;
                    ctx.strokeStyle = 'black';
                    ctx.setLineDash([5, 5])
                    ctx.moveTo(xCoor, yCoor);
                    ctx.lineTo(xCoor, bottom);
                    ctx.stroke();
                    ctx.closePath()
                    ctx.setLineDash([])
                }
                
            }
        }
    ]
    
    const options = {
        plugins:{ 
            autocolors: {
                mode: 'dataset',
            }, 
        },    
    }

    useEffect(
        () => {
            getUser().then(
                (response) => {
                    if(response.status === 200){
                        setUser(response.data)
                    }
                }
            ).catch(() => {
                navigate("/login")
            });
            if(executedModel == null){
                getModelExecutionResult(modelId,state.requestData).then(
                    (response) => {
                        if(response.status === 200){
                            setExecutedModel(new ExecutedModel(state.model,state.model.variables, response.data))
                        }
                    }
                )
            }
        }, []
    )

    useEffect(
        () => {
            if(executedModel != null){
                var auxArray = []
                executedModel.getVariablesOfType('Stateful').forEach(variable => {
                    var label = variable.getName()
                    if (variable.getUnits() != null){
                        label = label + ' (' + variable.getUnits() + ')'
                    }
                    var selectedVariable = {
                        label: label,
                        data: variable.getData(),
                        id: variable.getId(),
                    }
                    auxArray.push(selectedVariable)
                })
                setSelectedVariables(auxArray)
            }
            
        }, [executedModel]
    )
    
        return(
            <React.StrictMode>
                <ChakraProvider>
                    <selectedVariablesContext.Provider value={{selectedVariables, setSelectedVariables, executedModel, setNumberOfCharts}}>
                        <Stack height="100%" width="100%" direction="column" display="flex" alignItems="center" spacing="0px">
                            { selectedVariables?
                                <>
                                    <NavBarLogged name={user.name}></NavBarLogged>
                                    <Stack display="flex" direction="row" minWidth="100%" width="100%" maxWidth="100%" minHeight="75%" height="75%" maxHeight="75%" backgroundColor="#F2F2F2"> 
                                        
                                        <VariablesMenu requestData={state.requestData}></VariablesMenu>
                                        {
                                            numberOfCharts === 'Single'?
                                            <Stack display="flex" direction="column" width="70%" height="100%"  alignContent="center" alignItems="center" borderRadius="10px">
                                                <Box display="flex" flexDirection="row" minWidth="100%" width="100%" maxWidth="100%" minHeight="7%" height="7%" maxHeight="7%" backgroundColor="white" justifyContent="center" alignItems="center">
                                                    <Heading margin="2.5%" size='sm'>Simulation conditions:</Heading>
                                                    <Heading margin="2.5%" color="#696969" size="sm">Initial Time:</Heading>
                                                    <Text>{state.requestData.start_time}</Text>
                                                    <Heading margin="2.5%" color="#696969" size="sm">Final Time:</Heading>
                                                    <Text>{state.requestData.final_time}</Text>
                                                    <Heading margin="2.5%" color="#696969" size="sm">Time Step:</Heading>
                                                    <Text>{state.requestData.time_step}</Text>
                                                </Box>
                                                <Box width="90%" height="90%" display="flex" justifyContent="center" justifyItems="center" alignContent="center" alignItems="center" backgroundColor="white" borderRadius="10px">
                                                    <Box width="95%" minHeight="95%" height="95%" maxHeight="95%" display="flex" justifyContent="center" justifyItems="center" alignContent="center" alignItems="center" backgroundColor="white">
                                                        <Line data={{labels: executedModel.getTimeArray(), datasets: selectedVariables}} options={options} plugins={plugins}/>
                                                    </Box>
                                                </Box>
                                            </Stack>
                                            :
                                            <Stack display="flex" direction="column" width="70%" height="100%"  alignContent="center" alignItems="center" overflowY="scroll">
                                                <Box display="flex" flexDirection="row" minWidth="100%" width="100%" maxWidth="100%" minHeight="7%" height="7%" maxHeight="7%" backgroundColor="white" justifyContent="center" alignItems="center">
                                                    <Heading margin="2.5%" size='sm'>Simulation conditions:</Heading>
                                                    <Heading margin="2.5%" color="#696969" size="sm">Initial Time:</Heading>
                                                    <Text>{state.requestData.start_time}</Text>
                                                    <Heading margin="2.5%" color="#696969" size="sm">Final Time:</Heading>
                                                    <Text>{state.requestData.final_time}</Text>
                                                    <Heading margin="2.5%" color="#696969" size="sm">Time Step:</Heading>
                                                    <Text>{state.requestData.time_step}</Text>
                                                </Box>
                                                {
                                                    
                                                    selectedVariables.map((variable) => {
                                                        var lookedVariable = executedModel.getVariableById(variable.id)
                                                        var optionsWithUnits = null
                                                        if (lookedVariable.getUnits() !== null){
                                                            optionsWithUnits = {...options}
                                                            optionsWithUnits.scales = {
                                                                y:{
                                                                    ticks: {
                                                                        callback: function(value, index, ticks) {
                                                                            return value + ' ' + lookedVariable.getUnits();
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        

                                                        return(
                                                            <Box key={variable.id} width="90%" minHeight="90%" height="90%" maxHeight="90%" display="flex" flexDirection="column" justifyContent="center" justifyItems="center" alignContent="center" alignItems="center" backgroundColor="white" borderRadius="10px" margin="2.5%">
                                                                <Heading marginTop="2%" justifySelf="center" size='sm'>{lookedVariable.getFormattedName()}</Heading>
                                                                <Text alignSelf="center" size='sm' color="#696969">{lookedVariable.getComment()}</Text>
                                                                <Box width="95%" height="95%" display="flex" justifyContent="center" justifyItems="center" alignContent="center" alignItems="center" backgroundColor="white">
                                                                    <Line data={{labels: executedModel.getTimeArray(), datasets: [variable]}} options={optionsWithUnits ? optionsWithUnits : options} plugins={plugins}/>
                                                                </Box>
                                                            </Box>
                                                        )
                                                    })
                                                
                                                }
                                            </Stack>
                                        }
                                    </Stack>
                                </>
                                :
                                <></>
                            }
                        </Stack>
                    </selectedVariablesContext.Provider>
                </ChakraProvider>
            </React.StrictMode>
        )
}