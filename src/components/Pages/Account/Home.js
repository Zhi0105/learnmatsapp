import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import useUserStore from '@_stores/auth'
import { TranslationContext } from '@_context/TranslationContext'

export const Home = () => {
  const { translate } = useContext(TranslationContext)
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));


  return (
    <View className="login-main min-h-screen flex justify-center items-center">
      <Text className="text-xl text-red-500">
        welcome, { translate(user?.name) }
      </Text>
    </View>
  )
}
