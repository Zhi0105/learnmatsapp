import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { Question } from './Question'

export const Questionaire = ({ route, navigation }) => {
  const { questionList, material } = route.params
  const [ isNext, setIsNext ] = useState(true)
  const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState(0)
  const [ questionNo, setQuestionNo ] = useState(1)
  const [ answer, setAnswer ] = useState()
  const [ timer, setTimer] = useState(30)
  const [ answerSheet ] = useState([])


  const handleFinished = () => {
    Alert.alert(
      'Message from learnmatsapp:',
      'you almost done, press yes if you want to view your result, eitherwise press no!',
      [
        {
          text: "Yes",
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Result', params: { Result: answerSheet, material: material } }],
            });
          }
        }, 
        {
          text: "No",
          onPress: () => {
            console.log("@AS:", answerSheet)
            navigation.navigate("Home")
          }
        }
      ],
      { cancelable: false }
    )
  }

  const handleNextButton = () => {
    handleAnswerSheet(answer, questionList[currentQuestionIndex])
    if(currentQuestionIndex < questionList?.length - 1) {
      setQuestionNo(questionNo + 1)
      setCurrentQuestionIndex(currentQuestionIndex + 1)

      setTimer(30)
    } else {
      handleFinished()
    }
  }

  const handleAnswerSheet = (answer, currentQuestion) => {
    answerSheet.push({ question: currentQuestion, user_answer:answer })
    setAnswer(null)
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
    
        </View>
      }
    </View>
  )
}
