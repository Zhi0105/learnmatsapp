import React, { useEffect, useCallback } from 'react'
import { TranslationContext } from '@_context/TranslationContext';
import { GetTranslations } from '@_services/translation';
import useUserStore from '@_stores/auth';
import useTranslationStore from '@_stores/translation';
import useLanguageStore from '@_stores/language';
import _ from 'lodash';

export const TranslationProviders = ({ children }) => {
  const { token } = useUserStore((state) => ({ token: state.token }));
  const { languagecode  } = useLanguageStore((state) => ({ 
    languagecode: state.languagecode
  }));
  const { translations, setTranslations } = useTranslationStore((state) => ({ 
    translations: state.translations,
    setTranslations: state.setTranslations 
  }));
 
  useEffect(() => {
    (async() => {
      if(token) {
        const translations = await GetTranslations(token)
        if(translations) {
          setTranslations(translations)
          return translations
        }
      }
    })()
  }, [token])

  const translateCallback = useCallback((word) => {
    const translatedWord = _.find(translations, (translation) => { return translation.language_id  === languagecode && translation.word.toLowerCase() === word.toLowerCase()})
    if(translatedWord) return translatedWord.translation
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