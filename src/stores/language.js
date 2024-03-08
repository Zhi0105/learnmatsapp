import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage'

let languageStore = (set) => ({
  languages: [],
  languagecode: "",
  setLanguages: (data) => set(() => ({
    languages: [ ...data ] 
  })),
  setLanguageCode: (data) => set(() => ({
    languagecode: data
  })),

  resetLanguages: () => set(() => ({ languages: [] })),
})

const useLanguageStore = create(persist(languageStore, {
    name: "language",
    storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
}))

export default useLanguageStore


