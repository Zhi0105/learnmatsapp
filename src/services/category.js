import { apiClient } from "@_src/http-commons"
import { useQuery } from "@tanstack/react-query";


export const GetCategory = (user) => {
  const headers = {
    Authorization: `Bearer ${user}`
  }

  return useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      const result  = apiClient.get('/category/get-categories', { headers }).then(res => {
        return res.data
      }).catch(err => {
        return err.response.data
      })

      return result
    }
  })

}