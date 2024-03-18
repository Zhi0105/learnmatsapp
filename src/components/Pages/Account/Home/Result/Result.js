import React, { useCallback, useContext } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { ResultContext } from '@_context/ResultContext';
import useUserStore from '@_stores/auth';
import * as Progress from 'react-native-progress';
import _ from 'lodash';

export const Result = ({ route }) => {
  const { token } = useUserStore((state) => ({ token: state.token }));
  const { Result, material } = route.params
  const { createResult, createResultLoading } = useContext(ResultContext)

  const getCorrectCallback = useCallback((Result) => {
    const correct = _.filter(Result, (res) => { return res.user_answer?.is_correct === true })
    return correct?.length
  }, [Result])

  const handleConfirm = () => {
    const questionRef = Result[Result?.length - 1]?.question.question 
    let payload = {
      material_id: questionRef?.material_id,
      classlevel_id: questionRef?.classlevel_id,
      score_by_percentage: (getCorrectCallback(Result) / Result?.length) * 100,
      total_correct_answer: getCorrectCallback(Result),
      total_incorrect_answer: Result?.length - getCorrectCallback(Result),
      number_of_question: Result?.length,
      user: token
    }
    payload && createResult(payload)
  }

  return (
    <View className="result-main min-h-screen w-full bg-gray-100">
      <View className="flex flex-row m-2 p-4 rounded-2xl shadow-lg">
        <View className="w-2/5 bg-white rounded-lg shadow-lg p-4 flex flex-col justify-center items-center">
          <Progress.Circle size={100} animated={false} progress={getCorrectCallback(Result) / Result?.length} showsText={true}/>
          <Text className="font-bold text-base capitalize">{material}</Text>
        </View>
        <View className="w-3/5 bg-white rounded-lg shadow-lg p-4 flex flex-col justify-center">
          <Text className="text-base font-medium mb-1 text-blue-500">Number of questions: <Text className="text-black">{Result?.length}</Text></Text>
          <Text className="text-base font-medium mb-1 text-green-500">Total Correct: <Text className="text-black">{getCorrectCallback(Result)}</Text></Text>
          <Text className="text-base font-medium mb-1 text-red-500">Total Incorrect: <Text className="text-black">{Result?.length - getCorrectCallback(Result)}</Text></Text>
        </View>
      </View>

      <View className="history h-[60%] flex flex-col p-6">
        <ScrollView className="classlevel-main h-full w-full">
          {Result?.length && Result.map((res, index) => {
            return (
              <View
                key={index}
              >
                <Text className="text-base mb-2"><Text className="font-bold">{index + 1}.)</Text>  {res.question.question.name}</Text>
                <View className="flex flex-row flex-wrap py-2"> 
                {res.question.choices.map((choice, index) => {
                  return (
                    <View key={index} className="w-1/2 flex flex-row flex-wrap p-4">
                      <Text className={`w-full font-bold capitalize rounded-md shadow-lg p-2
                        ${choice.id === res.user_answer.id && res.user_answer.is_correct === true ? 'bg-green-400' : 
                          choice.id === res.user_answer.id && res.user_answer.is_correct === false ? 'bg-red-400':
                          choice.is_correct === true && res.user_answer.is_correct === false ? 'bg-blue-400':
                        'bg-white'
                        }`}
                      >
                        {choice.name}
                      </Text>
                    </View>
                  )
                })}
                </View>
              </View>
            )
          })}
        </ScrollView>
      </View>

      <TouchableOpacity
        disabled={createResultLoading}
        onPress={() => handleConfirm()} 
        className="flex justify-center items-center rounded mx-6 pb-2 pt-2.5 bg-blue-400"
      >
        <Text
          className="text-xs font-medium capitalize leading-normal text-center text-white"
        >
          {createResultLoading ? "Please wait..." : "Confirm"}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
