import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import useQuestionStore from '@_stores/question';
import useAnswerStore from '@_stores/answer';
import LottieView from 'lottie-react-native'


export const MaterialDetail = ({ route, navigation }) => {
  const { material } = route.params
  const { questions } = useQuestionStore((state) => ({ questions: state.questions }));
  const { answers } = useAnswerStore((state) => ({ answers: state.answers }));

  useEffect(() => {
    console.log("@material:", material)
    // console.log("@questions:", questions)
    // console.log("@answers:", answers)

    
  }, [material, questions, answers])

  return (
    <View className="material_detail_main min-h-screen block rounded-lg bg-white text-surface">
      <Text className="border-b-2 border-neutral-100 px-6 py-3 text-xl font-medium leading-tight capitalize">
        {material?.name}
      </Text>
      <View className="p-6">
        <View className="w-[100%] h-[30%]">
          <LottieView
            source={require('@_assets/teach.json')}
            style={{ width: "100%", height: "100%" }}
            autoPlay
            loop
          /> 
        </View>
        <Text className="mb-2 text-xl font-medium leading-tight">
            Kindly read carefully:
        </Text>
        <Text className="mb-4 text-base">
          {material?.material_description}
        </Text>

        <Text className="mb-1 text-xl font-medium leading-tight">
          Note:
        </Text>
        <Text className="my-2 text-base">
            If you're ready, you may proceed for the material by pressing <Text className="px-2 italic font-bold">start</Text> button, If no, try another material by pressing <Text className="px-2 italic font-bold">another material</Text>.
        </Text>

        <View className="flex flex-col gap-2">
          <TouchableOpacity
            onPress={() => Alert.alert("you may proceed to material questionaire!")}
            className="inline-block rounded bg-blue-400 px-6 pb-2 pt-2.5"
          >
            <Text className="text-xs font-medium capitalize leading-normal text-white text-center">Start</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="inline-block rounded bg-blue-400 px-6 pb-2 pt-2.5"
          >
            <Text className="text-xs font-medium capitalize leading-normal text-white text-center"> another material ?</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  )
}
