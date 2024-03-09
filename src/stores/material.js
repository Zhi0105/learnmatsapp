import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage'

let materialStore = (set) => ({

  materials: [],
  setMaterials: (data) => set(() => ({
    materials: [ ...data ] 
  })),
  resetMaterials: () => set(() => ({ materials: [] })),

})

const useMaterialStore = create(persist(materialStore, {
    name: "classlevel",
    storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
}))

export default useMaterialStore


