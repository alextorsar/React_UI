import { useState, useEffect } from "react"
import { getModelDocumentation } from "../../api/models-api"

import { useNavigate } from "react-router-dom";

export function ModelVariablesTable({modelId}){
    const navigate = useNavigate()
    const [documentation,setDocumentation] = useState(null)
    const columns = [
        {
            key:"Real Name",
            label: "Name"
        }, 
        {
            key:"Comment",
            label: "Coment"
        },
        {
            key:"Type",
            label: "Type"
        },
        {
            key:"Subtype",
            label: "Subtype"
        },
        {
            key:"Units",
            label: "Units"
        }, 
    ]
    useEffect( () => {
        getModelDocumentation(modelId).then(
          (response) => {
            if(response.status === 200){
                setDocumentation(response.data)
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
            <></>
            :
            <></>
        }
        </>
      )
      
}