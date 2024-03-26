import {useState} from 'react'
import {MdCloudUpload, MdDelete} from 'react-icons/md'
import '../NewModel/multipleUploader.css'
import { Input, Image, Stack, Text, Box, Grid, GridItem } from '@chakra-ui/react'

export function UpdateMultipleUploader({name,register,unregister}) {
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
                        setFiles(files.concat(selectedFiles))
                        setFileNames(fileNames.concat(selectedFileNames))
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
                                <GridItem display="flex" height="100%" minHeight="100%" maxHeight="10%">
                                    <Stack display= "flex "direction="column" alignItems="center" height="100%" minHeight="100%" maxHeight="100%">
                                        <Image src="/src/images/panel-escrito.png" height="90%" minHeight="90%" maxHeight="90%" objectFit="cover"/>
                                        <Stack width="100%" minWidth="100%" maxWidth="100%" height="10%" minHeight="10%" maxHeight="10%" direction="row" alignItems="center" display="flex">
                                            <Text width="90%" minWidth="0%" maxWidth="90%">{name}</Text>
                                            <MdDelete width="10%" minWidth="10%" maxWidth="10%" 
                                                onClick={ () => {
                                                    var newFiles = files.filter(file => file.name != name);
                                                    var newFileNames = fileNames.filter(selectedName => selectedName != name) 
                                                    setFiles(newFiles)
                                                    setFileNames(newFileNames)
                                                }}
                                            />
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