import React, { useState, useEffect, useCallback, useContext } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { ResultContext } from '@_context/ResultContext'
import { Question } from './Question'
import useUserStore from '@_stores/auth'
import _ from 'lodash';

export const Questionaire = ({ route, navigation }) => {
  const { createResult } = useContext(ResultContext)
  const { token } = useUserStore((state) => ({ token: state.token }));
  const { questionList, material } = route.params
  const [ isNext, setIsNext ] = useState(true)
  const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState(0)
  const [ questionNo, setQuestionNo ] = useState(1)
  const [ answer, setAnswer ] = useState()
  const [ timer, setTimer] = useState(30)
  const [ answerSheet ] = useState([])

  const getCorrectCallback = useCallback((answerSheet) => {
    const correct = _.filter(answerSheet, (res) => { return res.user_answer?.is_correct === true })
    return correct?.length
  }, [answerSheet])

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
            const questionRef = answerSheet[answerSheet?.length - 1]?.question.question 
            let payload = {
              material_id: questionRef?.material_id,
              classlevel_id: questionRef?.classlevel_id,
              score_by_percentage: (getCorrectCallback(answerSheet) / answerSheet?.length) * 100,
              total_correct_answer: getCorrectCallback(answerSheet),
              total_incorrect_answer: answerSheet?.length - getCorrectCallback(answerSheet),
              number_of_question: answerSheet?.length,
              user: token
            }
            payload && createResult(payload)
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
