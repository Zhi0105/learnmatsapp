import React, { useEffect, useCallback } from 'react'
import { TranslationContext } from '@_context/TranslationContext';
import { GetTranslations } from '@_services/translation';
import useUserStore from '@_stores/auth';
import useTranslationStore from '@_stores/translation';
import useLanguageStore from '@_stores/language';
import _ from 'lodash';

export const TranslationProviders = ({ children }) => {
  const { token } = useUserStore((state) => ({ token: state.token }));
  const { languagecode, setLanguageCode  } = useLanguageStore((state) => ({ 
    languagecode: state.languagecode,
    setLanguageCode: state.setLanguageCode
  }));
  const { translations, setTranslations } = useTranslationStore((state) => ({ 
    translations: state.translations,
    setTranslations: state.setTranslations 
  }));

  const { data:getTranslations, isLoading: translationLoading, refetch: translationRefetch } = GetTranslations(token)

  useEffect(() => {
    if(token && !translationLoading) {
      translationRefetch()
    }
    
      getTranslations?.length && setLanguageCode("")
      getTranslations?.length && setTranslations(getTranslations)
    
  }, [token, translationRefetch, translationLoading, getTranslations])


  const translateCallback = useCallback((word) => {
    const translatedWord = _.find(translations, (translation) => { return translation.language_id  === languagecode && translation?.word.toLowerCase() === word?.toLowerCase()})
    if(translatedWord) { 
      return translatedWord.translation 
    }
    if(languagecode === "0") {
      return word
    }
    return word
  },[languagecode])
  
  return (
    <TranslationContext.Provider
    value={{
      translate: (word) => { return translateCallback(word) }
    }}
    >
      {children}
    </TranslationContext.Provider>
  )
}