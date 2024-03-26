import {useState} from 'react'
import {MdCloudUpload, MdDelete} from 'react-icons/md'
import '../NewModel/uploader.css'
import { Image, Input, Stack, Text } from '@chakra-ui/react'

export function UpdateUploader({name,register,setValue, unregister, errors, model}) {
    const nameUpperCase = name[0].toUpperCase() + name.slice(1)
    if(name == "file"){
        var imageInput = false
        var fileSrc = ("/src/images/panel-escrito.png")
        var srcArray = model.getFile().split('/')
        var nameSrc = srcArray[srcArray.length - 1]

    }else{
        var imageInput = true
        var fileSrc = (model.getImageSrc())
        var srcArray = model.getImageSrc().split('/')
        var nameSrc = srcArray[srcArray.length - 1]
    }
    const [file, setFile] = useState(fileSrc)
    const [fileName, setFileName] = useState(nameSrc)
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