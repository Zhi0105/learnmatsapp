import { apiClient } from "@_src/http-commons"

export const GetMaterial = (user) => {
  const headers = {
    Authorization: `Bearer ${user}`
  }

  const result  = apiClient.get('/material/get-materials', { headers }).then(res => {
    return res.data
  }).catch(err => {
    return err.response.data
  })

  return result
}