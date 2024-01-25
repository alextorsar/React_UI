import {useState} from 'react'
import {MdCloudUpload, MdDelete} from 'react-icons/md'
import './uploader.css'
import { Image, Input, Stack, Text } from '@chakra-ui/react'

export function Uploader({name,register,setValue, unregister, errors}) {
    const nameUpperCase = name[0].toUpperCase() + name.slice(1)
    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState("No selected file")
    var imageInput = true
    if(name == "file"){
        imageInput = false
    }
    return  (
        <div className='uploaderBox' onClick={() => {document.getElementById(name).click()}}>
            <Input
                id={name}
                type="file"
                {...register(name, {
                    onChange: (event) => {
                        var selectedFile = event.target.files[0];
                        if(selectedFile != null){
                            setFile(URL.createObjectURL(selectedFile))
                            setFileName(selectedFile.name)
                        }    
                    },
                    required:`${nameUpperCase} is required`
                })}
                hidden
            />
            {file ?
                <Stack display= "flex" direction="column" alignItems="center" height="100%" minHeight="100%" maxHeight="100%">
                {
                    imageInput ?
                    <Image src={file} alignSelf="center" height= "60%" marginTop="5%" objectFit="cover"/>
                    :
                    <Image src="/src/images/panel-escrito.png" height= "70%" marginTop="5%" objectFit="cover"/>
                }
                    <Stack direction="row" alignItems="center" marginTop="auto">
                        <Text isTruncated>{fileName}</Text>
                        <MdDelete onClick={ () => {
                            setFile(null)
                            setFileName("No selected file")
                            unregister(name)
                        }}/>
                    </Stack>
                </Stack>
                :
                <>
                    <MdCloudUpload color="#0078ff" size="40%"/>
                    <Text>Browse files to upload</Text>
                    <Text color="red">{errors?.message}</Text>
                </>
            }
        </div>
    )
}