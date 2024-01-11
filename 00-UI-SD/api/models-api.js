
import axios from 'axios'

const host = "http://localhost:8001/api"

export const modelsAPI = axios.create({
  baseURL: host,
  withCredentials: true
});

export const getModel = async (modelId) => {
    const response = await modelsAPI.get("/model/"+modelId, {withCredentials: true})
    return  response
}

export const getModels = async () => {
    const response = await modelsAPI.get("/model/", {withCredentials: true})
    return  response
}

export const getImageSrc = (image) => {
  return host + image
}

export const deleteModel = async (id) => {
  const requestData = { id: id };
  const response = await modelsAPI.delete("/model/",{ data: requestData })
  return response
}

export const postModel = async(values) => {
  const requestData = new FormData()
  var submodels = Array.prototype.slice.call(values.submodels)
  submodels.forEach((submodel) => {
    requestData.append('submodels', submodel);
  });
  requestData.append('name',values.name)
  requestData.append('image',values.image)
  requestData.append('file',values.file)
  const response = await modelsAPI.post("/model/",requestData, {
    headers: {
    'Content-Type': 'multipart/form-data'
  } })
  return response
}

export const getModelDocumentation = async (modelId) => {
  const response = await modelsAPI.get("/model/"+modelId+"/documentation/", {withCredentials: true})
  return  response
}