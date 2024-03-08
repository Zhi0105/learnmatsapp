import { apiClient } from "@_src/http-commons"

export const GetTranslations = (user) => {
  const headers = {
    Authorization: `Bearer ${user}`
  }

  const result  = apiClient.get('/translation/get-translations', { headers }).then(res => {
    return res.data
  }).catch(err => {
    return err.response.data
  })

  return result
}