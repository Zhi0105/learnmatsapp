import { apiClient } from "@_src/http-commons"


export const Register = async(payload) => {
  
  const result = await apiClient.post('auth/signup', payload).then(res => {
    return res.data
  })

  return result
}

export const Login = async(payload) => {

  const result = await apiClient.post('auth/signin', payload).then(res => {
    return res.data
  })

  return result
}

export const GetUser = (user) => {
  const headers = {
    Authorization: `Bearer ${user}`
  }

    const result  = apiClient.get('/users/me', { headers }).then(res => {
      return res.data
    }).catch(err => {
      return err.response.data
    })

    return result
}



