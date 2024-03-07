import { MMKV } from 'react-native-mmkv'

const storage = new MMKV()

export const zustandStorage = {
  setItem: (key, value) => storage.set(key, value),
  getItem: (key) => storage.getString(key) || null,
  removeItem: (key) => storage.delete(key)
}