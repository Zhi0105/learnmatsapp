import { apiClient } from "@_src/http-commons"
import { useQuery } from "@tanstack/react-query";

export const GetResult = (user) => {
  const headers = {
    Authorization: `Bearer ${user}`
  }
  return useQuery({
    queryKey: ['results'],
    queryFn: () => {
      const result = apiClient.get('/result/get-results', { headers }).then(res => {
        return res.data
      })
      return result
    }
  })


}

export const CreateResult = (payload) => {
  let params = {
    material_id: Number(payload.material_id),
    classlevel_id: Number(payload.classlevel_id),
    score_by_percentage: Number(payload.score_by_percentage),
    total_correct_answer: Number(payload.total_correct_answer),
    total_incorrect_answer: Number(payload.total_incorrect_answer),
    number_of_question: Number(payload.number_of_question)    
  }
  const headers = {
    Authorization: `Bearer ${payload.user}`
  }

  const result = apiClient.post('/result/create', params, { headers }).then(res => {
    return res.data
  })
  return result
}