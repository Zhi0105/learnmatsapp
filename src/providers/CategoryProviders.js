import React, { useEffect } from 'react'
import { CategoryContext } from '@_context/CategoryContext'
import { GetCategory } from '@_services/category'
import useUserStore from '@_stores/auth'
import useCategoryStore from '@_stores/category'

export const CategoryProviders = ({ children }) => {
  const { token } = useUserStore((state) => ({ token: state.token }));
  const { setCategories } = useCategoryStore((state) => ({ setCategories: state.setCategories }));
  const { data:categories, isLoading: categoriesLoading, refetch: categoriesRefetch } = GetCategory(token)


  useEffect(() => {
    if(token && !categoriesLoading) {
      categoriesRefetch()
    }

    categories?.length && setCategories(categories)
  }, [token, categoriesRefetch, categoriesLoading, categories])


  return (
    <CategoryContext.Provider
      value={null}
    >
      {children}
    </CategoryContext.Provider>
  )
}
