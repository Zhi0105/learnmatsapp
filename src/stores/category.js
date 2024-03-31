import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage'

let categoryStore = (set) => ({

  categories: [],
  setCategories: (data) => set(() => ({
    categories: [ ...data ] 
  })),
  resetCategories: () => set(() => ({ categories: [] })),

})

const useCategoryStore = create(persist(categoryStore, {
    name: "category",
    storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
}))

export default useCategoryStore


