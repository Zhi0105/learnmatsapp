import { apiClient } from "@_src/http-commons"


export const GetLanguages = (user) => {
  const headers = {
    Authorization: `Bearer ${user}`
  }

  const result  = apiClient.get('/language/get-languages', { headers }).then(res => {
    return res.data
  }).catch(err => {
    return err.response.data
  })

  return result
}