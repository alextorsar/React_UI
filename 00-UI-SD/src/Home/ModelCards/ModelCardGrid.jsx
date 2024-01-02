import React, { useContext } from "react"
import {SimpleGrid} from '@chakra-ui/react'
import { ModelCard } from "./ModelCard"
import { selectedModelsContext } from '../Logged'


export function ModelCardGrid(){
  const context = useContext(selectedModelsContext)
  var modelList = context.models
  return(
      <SimpleGrid columns={3} spacing={10} margin="2%">
        {
          modelList.map((model) => (
              <ModelCard key = {model.id} model = {model}></ModelCard>
            )
          )
        }
      </SimpleGrid>
  )
}