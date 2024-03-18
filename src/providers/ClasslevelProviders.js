import React, { useEffect } from 'react'
import { ClasslevelContext } from '@_context/ClasslevelContext'
import { GetClassLevel } from '@_services/classlevel'
import useUserStore from '@_stores/auth';
import useClasslevelStore from '@_stores/classlevel';

export const ClasslevelProviders = ({ children }) => {
  const { token } = useUserStore((state) => ({ token: state.token }));
  const { setClasslevels } = useClasslevelStore((state) => ({ setClasslevels: state.setClasslevels }));
  const { data:classlevels, isLoading: classlevelsLoading, refetch: classlevelsRefetch } = GetClassLevel(token)

  useEffect(() => {
    if(token && !classlevelsLoading) {
      classlevelsRefetch()
    }

    classlevels?.length && setClasslevels(classlevels)
  }, [token, classlevelsRefetch, classlevelsLoading, classlevels])

  return (
    <ClasslevelContext.Provider
      value={null}
    >
      {children}
    </ClasslevelContext.Provider>
  )
}