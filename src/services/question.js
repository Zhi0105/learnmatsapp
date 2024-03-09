import { apiClient } from "@_src/http-commons"

export const GetQuestions = (user) => {
  const headers = {
    Authorization: `Bearer ${user}`
  }

  const result  = apiClient.get('/question/get-questions', { headers }).then(res => {
    return res.data
  }).catch(err => {
    return err.response.data
  })

  return result
}