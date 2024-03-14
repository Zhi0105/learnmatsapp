import React, { useEffect } from 'react'
import { View, Text } from 'react-native'


export const Result = ({ route, navigation }) => {
  const { Result } = route.params

  useEffect(() => {
    Result && console.log("@Result:", Result)
    navigation.navigate("Home")
  }, [Result])


  return (
    <View className="result-main">
      <Text> Hello from result screen </Text>
    </View>
  )
}
