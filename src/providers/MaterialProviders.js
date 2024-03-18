import React, { useEffect } from 'react'
import { MaterialContext } from '@_context/MaterialContext';
import { GetMaterial } from '@_services/material';
import useUserStore from '@_stores/auth';
import useMaterialStore from '@_stores/material';

export const MaterialProviders = ({ children }) => {
  const { token } = useUserStore((state) => ({ token: state.token }));
  const { setMaterials } = useMaterialStore((state) => ({ setMaterials: state.setMaterials }));
  const { data:materials, isLoading: materialsLoading, refetch: materialsRefetch } = GetMaterial(token)


  useEffect(() => {
    if(token && !materialsLoading) {
      materialsRefetch()
    }

    materials?.length && setMaterials(materials)
  }, [token, materialsRefetch, materialsLoading, materials])

  return (
    <MaterialContext.Provider
      value={null}
    >
      {children}
    </MaterialContext.Provider>
  )
}