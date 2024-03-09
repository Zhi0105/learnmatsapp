import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage'

let answerStore = (set) => ({

  answers: [],
  setAnswers: (data) => set(() => ({
    answers: [ ...data ] 
  })),
  resetAnswers: () => set(() => ({ answers: [] })),

})

const useAnswerStore = create(persist(answerStore, {
    name: "answer",
    storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
}))

export default useAnswerStore


