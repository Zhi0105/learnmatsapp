import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import LottieView from 'lottie-react-native'


export const Material = ({ data= [] }) => {
  return (
    <ScrollView className="material-main h-full w-full">
      <View className="container p-2 flex flex-row flex-wrap justify-around gap-2">
          {data?.map((material, index) => {
            return (
              <View key={index} className="max-w-sm flex flex-col justify-center items-center">
                <View className="w-[120] h-[120] rounded-lg overflow-hidden shadow-xl bg-white p-4 mb-1">
                <LottieView
                  source={require('@_assets/material.json')}
                  style={{ width: "100%", height: "100%" }}
                  autoPlay
                  loop
                />
                </View>
                <Text>{material?.name}</Text>
              </View>
            )
          })}      
      </View>
  </ScrollView>
  )
}
