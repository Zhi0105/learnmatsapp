import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export const Question = ({ 
  question, 
  answer, 
  setAnswer, 
  time, 
}) => {

  return (
    <View className="question-main">
      <Text className="mb-2 text-xl font-medium leading-tight">
        {question?.question.name}
      </Text>
      {!question?.choices.length && <Text className="text-base font-medium">No choices found</Text> }
      {question?.choices.length && 
      <View className="flex flex-row flex-wrap py-3">
        {question?.choices.map((item, index) =>{
          return (
            <View key={index} className="w-1/2 flex flex-row flex-wrap p-4">
              <TouchableOpacity
                disabled={time <= 0 ? true : false}
                onPress={() => setAnswer(item)}
                className="item w-full" 
              >
                <Text className={`font-bold capitalize rounded-md shadow-lg p-2
                    ${item?.id === answer?.id ? 'bg-green-500' : 'bg-gray-100'}
                    ${item?.id === answer?.id ? 'text-white' : 'text-black'}
                `}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            </View>
            )
          })
        }
      </View>
      }
      
    </View>


  )
}
