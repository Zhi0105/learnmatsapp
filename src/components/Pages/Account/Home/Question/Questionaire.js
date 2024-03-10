import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export const Questionaire = ({ route, navigation }) => {
  return (
    <View className="questionaire-main min-h-screen block rounded-lg bg-white text-surface">
      <Text className="border-b-2 border-neutral-100 px-6 py-3 text-xl font-medium leading-tight capitalize">
        question progress goes here!
      </Text>
      <View className="p-6">
        <Text className="mb-2 text-xl font-medium leading-tight">
            
        </Text>
        <Text className="mb-4 text-base">
          actual questions goes here!
        </Text>

        {/* <Text className="mb-1 text-xl font-medium leading-tight">
          Note:
        </Text>
        <Text className="my-2 text-base">
            If you're ready, you may proceed for the material by pressing <Text className="px-2 italic font-bold">start</Text> button, If no, try another material by pressing <Text className="px-2 italic font-bold">another material</Text>.
        </Text> */}

          <TouchableOpacity
            // onPress={() => Alert.alert("you may proceed to material questionaire!")}
            className="inline-block rounded bg-blue-400 px-6 pb-2 pt-2.5"
          >
            <Text className="text-xs font-medium capitalize leading-normal text-white text-center">Next</Text>
          </TouchableOpacity>

      </View>
    </View>
  )
}
