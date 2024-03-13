import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { Question } from './Question'

export const Questionaire = ({ route, navigation }) => {
  const [ isNext, setIsNext ] = useState(true)
  const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState(0)
  const [ questionNo, setQuestionNo ] = useState(1)
  const [ isFinished, setIsFinished ] = useState(false)
  const [ answer, setAnswer ] = useState()
  const [ timer, setTimer] = useState(30)
  const { questionList, material } = route.params

  const handleNextButton = () => {
    if(currentQuestionIndex < questionList?.length - 1) {
      setQuestionNo(questionNo + 1)
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setAnswer(null)
      setTimer(30)
    } else {
      Alert.alert("Great!, you may click done button, to view the result")
      setIsFinished(true)
      setTimer(30)
    }
  }

  const handleFinished = () => {
    setIsFinished(false)
    navigation.navigate("Home")
  }


  useEffect(() => {
    let interval;
    if(timer > 0){
      interval = setInterval(() => {
        setTimer(seconds => seconds - 1)
      }, 1000)
    }
    return () => clearInterval(interval);
  }, [timer])

  
  const nextstatusCallback = useCallback((answer, timer) => {
    if(answer?.hasOwnProperty("id")) {
      setIsNext(false)
    } else {
      setIsNext(true)
    }

    if(timer <= 0) {
      setIsNext(false)
    }
  }, [])
  
  
  useEffect(() => {
    nextstatusCallback(answer, timer)
  }, [nextstatusCallback, answer, timer])


  return (
    <View className="questionaire-main min-h-screen block rounded-lg bg-white text-surface">
      <Text className="border-b-2 border-neutral-100 px-6 py-3 text-xl text-center font-bold leading-tight capitalize">
        {material}
      </Text>
      {!questionList?.length && 
        <View className="flex justify-center items-center mt-5">
          <Text className="capitalize text-xl font-bold"> No question item found.</Text>
        </View>
      }

      {questionList?.length > 0 &&
        <View className="p-6">

          <View className="pb-4 flex flex-row justify-between items-center">
            <Text className="text-lg font-medium capitalize">
              question no: {questionNo}/{questionList?.length}
            </Text>
            <Text 
              className={`font-bold text-lg
                ${timer <= 10 ? 'text-red-500': 'text-green-500'}
              `}
            >
              {timer}
            </Text>
              
          </View>

          <Question 
            question={questionList[currentQuestionIndex]}
            answer={answer}
            setAnswer={setAnswer}
            time={timer}
          />

          {!isFinished &&
            <TouchableOpacity
              disabled={isNext}
              onPress={() => handleNextButton()}
              className={`inline-block rounded px-6 pb-2 pt-2.5
              ${isNext ? 'bg-gray-100' : 'bg-blue-400'}
                
              `}
            >
              <Text 
                className={`text-xs font-medium capitalize leading-normal text-center
                ${isNext ? 'text-black' : 'text-white'}
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
      }
    </View>
  )
}
