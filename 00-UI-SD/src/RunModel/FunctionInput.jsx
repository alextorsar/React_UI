import React from 'react';
import {MdCloudUpload, MdDelete} from 'react-icons/md'
import {
    FormControl,
    FormLabel,
    Stack,
    Image, 
    Input, 
    Text
} from '@chakra-ui/react';


import { useState } from 'react';
import '../NewModel/Uploader.css'

export function FunctionInput({ variable, register, setInputValue }) {
    const nameUpperCase = variable[0].toUpperCase() + variable.slice(1)
    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState("No selected file")
    return (
        <>
        <FormControl marginTop="3%" display="flex" flexDirection="column" alignContent="center" justifyContent="center" alignItems="center">
            <FormLabel htmlFor={variable}>Function</FormLabel>
            <div className='uploaderBox' onClick={() => {document.getElementById(variable).click()}}>
                <Input
                    id={variable}
                    type="file"
                    {...register(variable, {
                        onChange: (event) => {
                            var selectedFile = event.target.files[0];
                            if(selectedFile != null){
                                setFile(URL.createObjectURL(selectedFile))
                                setFileName(selectedFile.name)
                            }    
                        },
                    })}
                    hidden
                />
                {file ?
                    <Stack display= "flex" direction="column" alignItems="center" height="100%" minHeight="100%" maxHeight="100%">
                        <Image src="/src/images/panel-escrito-excel.png" maxHeight= "7rem" marginTop="5%" objectFit="cover"/>
                        <Stack direction="row" alignItems="center" marginTop="auto">
                            <Text isTruncated>{fileName}</Text>
                            <MdDelete onClick={ () => {
                                setFile(null)
                                setFileName("No selected file")
                                unregister(variable)
                            }}/>
                        </Stack>
                    </Stack>
                    :
                    <>
                        <MdCloudUpload color="#0078ff" size="30%"/>
                        <Text>Browse files to upload</Text>
                    </>
                }
            </div>
        </FormControl>
        </>
    );
}