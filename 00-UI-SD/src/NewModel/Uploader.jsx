import {useState} from 'react'
import {MdCloudUpload, MdDelete} from 'react-icons/md'
import './uploader.css'
import { Input, Stack, Text } from '@chakra-ui/react'

export function Uploader({name,register,setValue}) {
    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState("No selected file")
    var imageInput = true
    if(name == "file"){
        imageInput = false
    }
    return  (
        <div className='uploaderBox' width = "50%" height="100%" onClick={() => {document.getElementById(name).click()}}>
            <Input
                id={name}
                type="file"
                {...register(name, {
                    onChange: (event) => {
                        var selectedFile = event.target.files[0];
                        setValue(name, selectedFile);
                        setFile(URL.createObjectURL(selectedFile))
                        setFileName(selectedFile.name)
                    }
                })}
                hidden
            />
            {file ?
                <>
                {
                    imageInput ?
                    <img src={file} width="40%" height="40%"/>
                    :
                    <img src="/src/images/panel-escrito.png" width="40%" height="40%"/>
                }
                <Stack direction="row" alignItems="center">
                    <Text>{fileName}</Text>
                    <MdDelete onClick={ () => {
                        setFile(null)
                        setFileName("No selected file")
                    }}/>
                </Stack>
                </>
                :
                <>
                    <MdCloudUpload color="#0078ff" size="40%"/>
                    <Text>Browse files to upload</Text>
                </>
            }
        </div>
    )
}