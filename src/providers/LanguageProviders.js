import React, { useEffect, useCallback } from 'react'
import { LanguageContext } from '@_context/LanguageContext';
import { GetLanguages } from '@_services/language';
import useUserStore from '@_stores/auth';
import useLanguageStore from '@_stores/language';

export const LanguageProviders = ({ children }) => {
  const { token } = useUserStore((state) => ({ token: state.token }));
  const { setLanguages } = useLanguageStore((state) => ({ setLanguages: state.setLanguages }));
  const { data:languages, isLoading: languageLoading, refetch: languageRefetch } = GetLanguages(token)
  
  useEffect(() => {
    if(token && !languageLoading) {
      languageRefetch()
    }

    languages?.length && setLanguages(languages)
  }, [token, languageRefetch, languageLoading, languages])

  
  return (
    <LanguageContext.Provider
      value={null}
    >
      {children}
    </LanguageContext.Provider>
  )
}