
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

export const getSubModels = async (modelId) => {
  const response = await modelsAPI.get("/submodel/"+modelId, {withCredentials: true})
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
  if(values.image != null){
    requestData.append('image',values.image[0])
  }
  if(values.file != null){
    requestData.append('file',values.file[0])
  }
  requestData.append('name',values.name)
  const response = await modelsAPI.post("/model/",requestData, {
    headers: {
    'Content-Type': 'multipart/form-data'
  } })
  return response
}

export const updateModel = async(values,id, newSubModelsName, oldSubModels) => {
  const requestData = new FormData()
  for (var i = 0; i < oldSubModels.length; i++) {
    var path = oldSubModels[i].file.split('/')
    var oldName = path[path.length-1]
    if(!newSubModelsName.includes(oldName)){
      requestData.append('subModelsToDelete',oldSubModels[i].id)
    }
  }
  requestData.append('id',id)
  if(values.name != ''){
    requestData.append('name',values.name)
  }
  if(values.image.length > 0){
    requestData.append('image',values.image[0])
  }
  if(values.file.length > 0){
    requestData.append('file',values.file[0])
  }
  if(values.submodels.length > 0){
    var submodels = Array.prototype.slice.call(values.submodels)
    submodels.forEach((submodel) => {
      requestData.append('submodels', submodel);
    });
  }
  const response = await modelsAPI.put("/model/",requestData, {
    headers: {
    'Content-Type': 'multipart/form-data'
  } })
  return response
}

export const getModelDocumentation = async (modelId) => {
  const response = await modelsAPI.get("/model/"+modelId+"/documentation/", {withCredentials: true})
  return  response
}

export const getModelExecutionResult = async (modelId, requestData) => {
  var requestDataForm = new FormData()
  requestDataForm.append('start_time',requestData.start_time)
  const initial_condition_object = {}
  const params_object = {}
  for (var key in requestData.initial_condition){
    initial_condition_object[key] = requestData.initial_condition[key]
  }
  requestDataForm.append('initial_condition',JSON.stringify(initial_condition_object))
  for (var key in requestData.params){
    if(requestData.params[key].length == undefined)
      params_object[key] = requestData.params[key]
    else{
      requestDataForm.append(`params[${key}]`,requestData.params[key][0])
      params_object[key] = {"type":"FileObject", "name":requestData.params[key][0]['name']}
    }
  }
  requestDataForm.append('params',JSON.stringify(params_object))
  const response = await modelsAPI.post("/model/" + modelId + "/run/",requestDataForm, {
    headers: {
    'Content-Type': 'multipart/form-data'
  } })
  return response
}