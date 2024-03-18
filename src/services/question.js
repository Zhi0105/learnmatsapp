import { apiClient } from "@_src/http-commons"
import { useQuery } from "@tanstack/react-query";

export const GetQuestions = (user) => {
  const headers = {
    Authorization: `Bearer ${user}`
  }

  return useQuery({
    queryKey: ['questions'],
    queryFn: () => {
      const result  = apiClient.get('/question/get-questions', { headers }).then(res => {
        return res.data
      }).catch(err => {
        return err.response.data
      })

      return result
    }
  })

}