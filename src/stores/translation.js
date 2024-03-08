import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage'

let translationStore = (set) => ({
  translations: [],
  setTranslations: (data) => set(() => ({
    translations: [ ...data ] 
  })),
  resetTranslations: () => set(() => ({ translations: [] })),
})

const useTranslationStore = create(persist(translationStore, {
    name: "translation",
    storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
}))

export default useTranslationStore


