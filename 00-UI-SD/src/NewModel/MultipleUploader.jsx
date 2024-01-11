import {useState} from 'react'
import {MdCloudUpload, MdDelete} from 'react-icons/md'
import './multipleUploader.css'
import { Input, Stack, Text, Box, Grid, GridItem } from '@chakra-ui/react'

export function MultipleUploader({name,register}) {
    const [files, setFiles] = useState([])
    return  (
        <div className='multipleUploaderBox' onClick={() => {document.getElementById(name).click()}}>
            <Input
                id={name}
                type="file"
                {...register(name, {
                    onChange: (event) => {
                        var selectedFiles = Array.from(event.target.files).map((file) =>
                            URL.createObjectURL(file)
                        )
                        setFiles(selectedFiles)
                    }
                })}
                multiple
                hidden
            />
            <Box display="flex" justifyContent="center" overflowY="scroll"  width="100%" height="100%" minHeight="100%" maxHeight="100%">
                <Grid width="90%" minWidth="90%" maxWidth="90%" height="95%" minHeight="95%" maxHeight="95%" templateColumns='repeat(2, 1fr)' gap={3} marginTop="2.5%" marginBottom="2.5%">
                    <GridItem w='100%' h='10' bg='blue.500' />
                    <GridItem w='100%' h='10' bg='blue.500' />
                    <GridItem w='100%' h='10' bg='blue.500' />
                    <GridItem w='100%' h='10' bg='blue.500' />
                    <GridItem w='100%' h='10' bg='blue.500' /> 
                </Grid>
            </Box>
        </div>
    )
}