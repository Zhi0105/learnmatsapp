import React from 'react'
import { ResultContext } from '@_context/ResultContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CreateResult } from '@_services/result'
import { useNavigation } from '@react-navigation/native';

export const ResultProviders = ({ children }) => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  const { mutate: handleCreateResult, isLoading: createResultLoading } = useMutation({
    mutationFn: CreateResult,
    onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['result'] });
        console.log("@CR:", data)
        navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
      }, 
    onError: (err) => {  
      console.log("@CRE:", err)
    },
  });

  return (
    <ResultContext.Provider
      value={{
        createResult: (payload) => { handleCreateResult(payload) },
        createResultLoading: createResultLoading
      }}
    >
      {children}
    </ResultContext.Provider>
  )
}
