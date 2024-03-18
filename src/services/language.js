import { apiClient } from "@_src/http-commons"
import { useQuery } from "@tanstack/react-query";


export const GetLanguages = (user) => {
  const headers = {
    Authorization: `Bearer ${user}`
  }

  return useQuery({
    queryKey: ['languages'],
    queryFn: () => {
      const result  = apiClient.get('/language/get-languages', { headers }).then(res => {
        return res.data
      }).catch(err => {
        return err.response.data
      })

      return result
    }
  })


}