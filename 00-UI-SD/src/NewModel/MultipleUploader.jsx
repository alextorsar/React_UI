import {useState} from 'react'
import {MdCloudUpload, MdDelete} from 'react-icons/md'
import './multipleUploader.css'
import { Input, Image, Stack, Text, Box, Grid, GridItem } from '@chakra-ui/react'

export function MultipleUploader({name,register}) {
    const [files, setFiles] = useState([])
    const [fileNames, setFileNames] = useState([])
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
                        var selectedFileNames = Array.from(event.target.files).map((file) =>
                            file.name
                        )
                        setFiles(selectedFiles)
                        setFileNames(selectedFileNames)
                    }
                })}
                multiple
                hidden
            />
            {files.length > 0 &&
                <Box display="flex" justifyContent="center" overflowY="scroll"  width="100%" height="100%" minHeight="100%" maxHeight="100%">
                    <Grid width="90%" minWidth="90%" maxWidth="90%" height="95%" minHeight="95%" maxHeight="95%" templateColumns='repeat(3, 1fr)' gap={3} marginTop="2.5%" marginBottom="2.5%">
                    {
                        fileNames.map((name) => (
                                <GridItem display="flex">
                                    <Stack display= "flex "direction="column" alignItems="center" >
                                        <Image src="/src/images/panel-escrito.png" height= "30%" objectFit="cover"/>
                                        <Stack width="100%" minWidth="100%" maxWidth="100%" direction="row" alignItems="center" display="flex">
                                            <Text width="90%" minWidth="0%" maxWidth="90%">{name}</Text>
                                            <MdDelete width="10%" minWidth="10%" maxWidth="10%"/>
                                        </Stack>
                                    </Stack>
                                </GridItem>  
                            )
                        )
                    }
                    </Grid>
                </Box>
            }
            {files.length <= 0 &&
                <>
                    <MdCloudUpload color="#0078ff" size="45%"/>
                    <Text isTruncated>Browse files to upload</Text>
                </>
            }
            
        </div>
    )
}