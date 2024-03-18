import { apiClient } from "@_src/http-commons"
import { useQuery } from "@tanstack/react-query";

export const GetAnswers = (user) => {
  const headers = {
    Authorization: `Bearer ${user}`
  }

  return useQuery({
    queryKey: ['answers'],
    queryFn: () => {
      const result  = apiClient.get('/answer/get-answers', { headers }).then(res => {
        return res.data
      }).catch(err => {
        return err.response.data
      })

      return result
    }
  })
}