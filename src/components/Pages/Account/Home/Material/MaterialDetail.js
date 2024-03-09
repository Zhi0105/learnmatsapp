import React from 'react'
import { View, Text } from 'react-native'

export const MaterialDetail = ({ route }) => {
  const { material } = route.params


  return (
    <View>
      <Text>Hello from Material Detail screen</Text>
    </View>
  )
}
