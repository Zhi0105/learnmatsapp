import { apiClient } from "@_src/http-commons"
import { useQuery } from "@tanstack/react-query";

export const GetClassLevel = (user) => {
  const headers = {
    Authorization: `Bearer ${user}`
  }

  
  return useQuery({
    queryKey: ['classlevel'],
    queryFn: () => {
      const result  = apiClient.get('/classlevel/all', { headers }).then(res => {
        return res.data
      }).catch(err => {
        return err.response.data
      })
      return result
    }
  })
 
}