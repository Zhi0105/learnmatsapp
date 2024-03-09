import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage'

let classlevelStore = (set) => ({

  classlevels: [],
  setClasslevels: (data) => set(() => ({
    classlevels: [ ...data ] 
  })),
  resetClasslevels: () => set(() => ({ classlevels: [] })),

})

const useClasslevelStore = create(persist(classlevelStore, {
    name: "classlevel",
    storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
}))

export default useClasslevelStore


