import axios from 'axios'

export const usersAPI = axios.create({
  baseURL:"http://localhost:8001/api"
});

export const postLogin = async (values) => {
    const response = await usersAPI.post("/login/", values,  {withCredentials: true})
    return response
}

export const getUser = async () => {
    const response = await usersAPI.get("/user/", {withCredentials: true})
    return  response
}

export const postUser = async (values) => {
  const response = await usersAPI.post("/register/", values,{withCredentials: false})
  return response;
}

export const postLogOut = async () => {
    const response = await usersAPI.post("/logout/", {},{withCredentials: true})
    return  response
}