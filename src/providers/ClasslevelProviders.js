import React, { useEffect } from 'react'
import { ClasslevelContext } from '@_context/ClasslevelContext'
import { GetClassLevel } from '@_services/classlevel'
import useUserStore from '@_stores/auth';
import useClasslevelStore from '@_stores/classlevel';

export const ClasslevelProviders = ({ children }) => {
  const { token } = useUserStore((state) => ({ token: state.token }));
  const { setClasslevels } = useClasslevelStore((state) => ({ setClasslevels: state.setClasslevels }));

  useEffect(() => {
    (async() => {
      if(token) {
        const classlevels = await GetClassLevel(token)
        if(classlevels) {
          setClasslevels(classlevels)
          return classlevels
        }
      }
    })()
  }, [token])

  return (
    <ClasslevelContext.Provider
      value={null}
    >
      {children}
    </ClasslevelContext.Provider>
  )
}