import React from 'react'
import { View } from 'react-native'
import useLanguageStore from '@_stores/language'
import { DropDown } from '@_components/Forms/Select'

export const Settings = () => {
  const { languages, languagecode, setLanguageCode } = useLanguageStore((state) => ({ 
    languages: state.languages,
    languagecode: state.languagecode,
    setLanguageCode: state.setLanguageCode
  }));


  return (
    <View className="settings-main min-h-screen">
      <View className="w-full p-2">
        <DropDown 
          value={languagecode}
          onChange={(newValue) => setLanguageCode(newValue)}
          ariaPlaceHolder={"Choose language"}
          data={languages}
        />
      </View>
    </View>
  )
}
