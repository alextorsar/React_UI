import { useParams,useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { getModelExecutionResult } from '../../api/models-api'
import {
useToast,
Box
} from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { 
    Chart as ChartJS,
    LineElement,
    CategoryScale, 
    LinearScale,
    PointElement,
    Legend
} from 'chart.js'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend)

export function RunModelResult(){

    var time = []
    time[0]=0
    for(var i=1; i<241; i++){
        time[i]=time[i-1]+0.125
    }    
    const [responseData, setData] = useState({})
    const modelId = useParams().modelId
    useEffect(
        () => {
            getModelExecutionResult(modelId,state).then(
                (response) => {
                    if(response.status === 200){
                        console.log(response.data)
                        console.log(typeof(response.data))
                        setData(response.data)
                    }
                }
            ).catch(() => {
                console.log('error')
            });
        }, []
    )
    const {state} = useLocation();
    const data ={
        labels: time,
        datasets: [
            {
                label: 'Teacup Temperature',
                data: responseData['Teacup Temperature'],
                backgroundColor: 'aqua',
                borderColor: 'black',
                pointBorderColor: 'aqua',
            },
            {
                label: 'Room Temperature',
                data: responseData['Room Temperature'],
                backgroundColor: 'red',
                borderColor: 'black',
                pointBorderColor: 'red',
                fill: true
            }
        ]
    }
    
    const options = {
        plugings:{
            legend: true
        }
    }

    return(
        <Box width="100%" height="100%" display="flex" justifyContent="center" justifyItems="center" alignContent="center" alignItems="center">
            
            <Line data={data} options={options}/>
        </Box>
    )
}