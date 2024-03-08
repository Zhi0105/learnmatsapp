import React, { useEffect } from 'react'
import { LanguageContext } from '@_context/LanguageContext';
import { GetLanguages } from '@_services/language';
import useUserStore from '@_stores/auth';
import useLanguageStore from '@_stores/language';


export const LanguageProviders = ({ children }) => {
  const { token } = useUserStore((state) => ({ token: state.token }));
  const { setLanguages } = useLanguageStore((state) => ({ setLanguages: state.setLanguages }));

  // useQuery({
  
  useEffect(() => {
    (async() => {
      if(token) {
        const languages = await GetLanguages(token)
        if(languages) {
          setLanguages(languages)
          return languages
        }
      }
    })()
  }, [token])

  
  return (
    <LanguageContext.Provider
      value={null}
    >
      {children}
    </LanguageContext.Provider>
  )
}