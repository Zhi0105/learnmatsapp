import { apiClient } from "@_src/http-commons"
import { useQuery } from "@tanstack/react-query";

export const GetTranslations = (user) => {
  const headers = {
    Authorization: `Bearer ${user}`
  }


  return useQuery({
    queryKey: ['translations'],
    queryFn: () => {
    const result  = apiClient.get('/translation/get-translations', { headers }).then(res => {
        return res.data
      }).catch(err => {
        return err.response.data
      })

      return result
    }
  })
 
}