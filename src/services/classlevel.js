import { apiClient } from "@_src/http-commons"

export const GetClassLevel = (user) => {
  const headers = {
    Authorization: `Bearer ${user}`
  }

  const result  = apiClient.get('/classlevel/all', { headers }).then(res => {
    return res.data
  }).catch(err => {
    return err.response.data
  })

  return result
}