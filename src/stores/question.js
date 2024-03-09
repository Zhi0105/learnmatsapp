import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage'

let questionStore = (set) => ({

  questions: [],
  setQuestions: (data) => set(() => ({
    questions: [ ...data ] 
  })),
  resetQuestions: () => set(() => ({ questions: [] })),

})

const useQuestionStore = create(persist(questionStore, {
    name: "question",
    storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
}))

export default useQuestionStore


