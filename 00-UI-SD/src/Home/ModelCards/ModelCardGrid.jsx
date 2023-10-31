import React from "react"
import {SimpleGrid} from '@chakra-ui/react'
import { ModelCard } from "./ModelCard"

export function ModelCardGrid(){
    return(
        <SimpleGrid columns={3} spacing={10} margin="2%">
            <ModelCard modelName = "Apulia" imageName="apulia.jpg"></ModelCard>
            <ModelCard modelName = "Central Bohemian Region" imageName="central-bohemia.jpg"></ModelCard>
            <ModelCard modelName = "Central Greece" imageName="central-greece.jpg"></ModelCard>
            <ModelCard modelName = "Flanders" imageName="flanders.jpg"></ModelCard>
        </SimpleGrid>
    )
}