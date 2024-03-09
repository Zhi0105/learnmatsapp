import { apiClient } from "@_src/http-commons"

export const GetAnswers = (user) => {
  const headers = {
    Authorization: `Bearer ${user}`
  }

  const result  = apiClient.get('/answer/get-answers', { headers }).then(res => {
    return res.data
  }).catch(err => {
    return err.response.data
  })

  return result
}