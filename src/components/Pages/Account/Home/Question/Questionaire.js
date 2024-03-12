import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { Question } from './Question'

export const Questionaire = ({ route, navigation }) => {
  const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState(0)
  const [ questionNo, setQuestionNo ] = useState(1)
  const [ isFinished, setIsFinished ] = useState(false)
  const [ answer, setAnswer ] = useState()
  const { questionList, material } = route.params

  const handleNextButton = () => {
    if(currentQuestionIndex < questionList?.length - 1) {
      setQuestionNo(questionNo + 1)
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setAnswer(null)
    } else {
      Alert.alert("Great!, you may click done button, to view the result")
      setIsFinished(true)
    }
  }

  const handleFinished = () => {
    setIsFinished(false)
    navigation.navigate("Home")
  }

  const nextstatusCallback = useCallback((answer) => {
    if(answer?.hasOwnProperty("id")) {
      return false
    } else {
      return true
    }
  }, [])

  useEffect(() => {
    answer && console.log(answer)
  }, [answer])

  return (
    <View className="questionaire-main min-h-screen block rounded-lg bg-white text-surface">
      <Text className="border-b-2 border-neutral-100 px-6 py-3 text-xl text-center font-bold leading-tight capitalize">
        {material}
      </Text>
      <View className="p-6">

        <View className="pb-4 flex flex-row justify-between items-center">
          <Text className="text-lg font-medium capitalize">
            question no:
          </Text>
          <Text>
            {questionNo}/{questionList?.length}
          </Text>
        </View>
        
        <Question 
          question={questionList[currentQuestionIndex]}
          answer={answer}
          setAnswer={setAnswer}
        />

        {!isFinished &&
          <TouchableOpacity
            disabled={nextstatusCallback(answer)}
            onPress={() => handleNextButton()}
            className={`inline-block rounded px-6 pb-2 pt-2.5
            ${answer?.hasOwnProperty("id") ? 'bg-blue-400' : 'bg-gray-100'}
              
            `}
          >
            <Text 
              className={`text-xs font-medium capitalize leading-normal text-center
              ${answer?.hasOwnProperty("id") ? 'text-white' : 'text-black'}
              `}
            >
                Next
            </Text>
          </TouchableOpacity>
        }

        {isFinished && 
          <TouchableOpacity
            onPress={() => handleFinished()}
            className="inline-block rounded px-6 pb-2 pt-2.5 bg-blue-400"
          >
            <Text className="text-xs font-medium capitalize leading-normal text-white text-center">Done</Text>
          </TouchableOpacity>
        }

      </View>
    </View>
  )
}
