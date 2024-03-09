import React from 'react'
import { View, Text, ScrollView, TouchableOpacity} from 'react-native'
import LottieView from 'lottie-react-native'

export const Classlevel = ({ data = [], selected, setSelected }) => {

  return (
    <ScrollView className="classlevel-main h-full w-full">
      <View className="container p-2 flex flex-row flex-wrap justify-around gap-2">
          {data?.map((classlevel, index) => {
            return (
              <TouchableOpacity 
                onPress={() => setSelected(classlevel?.id)}
                className="max-w-sm flex flex-col justify-center items-center"
                key={index} 
              >
                <View 
                  className={`w-[120] h-[120] rounded-lg overflow-hidden shadow-xl p-4 mb-1 
                    ${classlevel?.id === selected ? 'bg-[#3b82f6]' : 'bg-white'}
                  `}
                >
                <LottieView
                  source={require('@_assets/star.json')}
                  style={{ width: "100%", height: "100%" }}
                  autoPlay
                  loop
                />
                </View>
                <Text>{classlevel?.name}</Text>
              </TouchableOpacity>
            )
          })}      
      </View>
    </ScrollView>
  )
}
