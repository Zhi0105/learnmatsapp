import { apiClient } from "@_src/http-commons"
import { useQuery } from "@tanstack/react-query";


export const GetMaterial = (user) => {
  const headers = {
    Authorization: `Bearer ${user}`
  }

  return useQuery({
    queryKey: ['materials'],
    queryFn: () => {
      const result  = apiClient.get('/material/get-materials', { headers }).then(res => {
        return res.data
      }).catch(err => {
        return err.response.data
      })

      return result
    }
  })


}