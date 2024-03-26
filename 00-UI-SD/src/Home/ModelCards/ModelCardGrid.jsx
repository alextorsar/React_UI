import React, { useContext } from "react"
import {SimpleGrid} from '@chakra-ui/react'
import { ModelCard } from "./ModelCard"
import { selectedModelsContext } from '../Logged'


export function ModelCardGrid({searchName}){
  const context = useContext(selectedModelsContext)
  var modelList = context.models
  return(
      <SimpleGrid columns={3} spacing={10} margin="2%" width="90%" min-width="90%" max-width="90%">
        {
          searchName === "" ?
          modelList.map((model) => (
              <ModelCard key = {model.id} model = {model}></ModelCard>
            )
          )
          :
          modelList.filter((model) => new RegExp('^'+ searchName.toLowerCase()).test(model.name.toLowerCase())).map((model) => (
              <ModelCard key = {model.id} model = {model}></ModelCard>
            )
          )
        }
      </SimpleGrid>
  )
}