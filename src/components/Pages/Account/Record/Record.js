import React, { useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { GetResult } from '@_services/result';
import useUserStore from '@_stores/auth';
import useMaterialStore from '@_stores/material';
import * as Progress from 'react-native-progress';
import _ from 'lodash'

export const Record = () => {
  const { token } = useUserStore((state) => ({ token: state.token }));
  const { materials } = useMaterialStore((state) => ({ materials: state.materials }));
  const { data:results, isLoading: resultLoading, refetch: resultRefetch } = GetResult(token)

  useEffect(() => {
    if(token && !resultLoading) {
      resultRefetch()
    }
  }, [token, resultRefetch, resultLoading])

  const getMaterialName = (material_id) => {
    const material = _.find(materials, { id: material_id })
    return material.name
  }
  let data = results?.length && results?.map((item) => ({ ...item, material: getMaterialName(item.material_id) }))

  return (
    <View className="record-main min-h-screen">
      {!resultLoading && !results?.length &&
        <Text>No record found!</Text>
      }
      {results?.length > 0 &&
        <View className="record-list-container min-h-full p-4">
          <View className="h-[80%] flex flex-col p-2">
            <ScrollView className="classlevel-main h-full w-full" showsVerticalScrollIndicator={false}>
              {data?.length && data?.length > 0 && data.map((item, index) => {
                return (
                  <View key={index} className="flex flex-row p-2 rounded-2xl shadow-lg">
                    <View className="w-2/5 bg-white rounded-lg shadow-lg p-4 flex flex-col justify-center items-center">
                      <Progress.Circle size={100} animated={false} progress={item?.score_by_percentage / 100} showsText={true}/>
                      <Text className="font-bold text-base capitalize">{item?.material}</Text>
                    </View>
                  <View className="w-3/5 bg-white rounded-lg shadow-lg p-4 flex flex-col justify-center">
                    <Text className="text-base font-medium mb-1 text-blue-500">Number of questions: <Text className="text-black">{item?.number_of_question}</Text></Text>
                    <Text className="text-base font-medium mb-1 text-green-500">Total Correct: <Text className="text-black">{item?.total_correct_answer}</Text></Text>
                    <Text className="text-base font-medium mb-1 text-red-500">Total Incorrect: <Text className="text-black">{item?.total_incorrect_answer}</Text></Text>
                  </View>
                </View>
          
                )
              })}
            </ScrollView>
          </View>
        </View>
      }
    </View>
  )
}
