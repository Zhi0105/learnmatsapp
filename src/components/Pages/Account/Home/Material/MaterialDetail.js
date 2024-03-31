import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { TranslationContext } from '@_context/TranslationContext';
import useQuestionStore from '@_stores/question';
import useAnswerStore from '@_stores/answer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import _ from 'lodash';

export const MaterialDetail = ({ route, navigation }) => {
  const { translate } = useContext(TranslationContext)
  const { material } = route.params
  const { questions } = useQuestionStore((state) => ({ questions: state.questions }));
  const { answers } = useAnswerStore((state) => ({ answers: state.answers }));
  

  const handleQuestionsList = () => {
    let exam = []
    const questionaire = _.filter(questions, (question) => { return question.material_id === material.id })
    questionaire?.map((question) => {
      const answer = _.filter(answers, (answer) => { return answer.question_id === question.id })
      exam.push({ question: question, choices: [ ...answer ] })
    })
  
    navigation.navigate("Question", { questionList: exam, material: material?.name })
  }

  return (
    <View className="material_detail_main min-h-screen block rounded-lg bg-white text-surface">
     <View className="title w-full flex flex-row justify-between items-center py-4 px-4 border-y-4 border-gray-200">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" color="gray" size={28} /> 
        </TouchableOpacity>
        <Text className="font-bold text-xl capitalize">{translate(material?.name)}</Text>
        <Text className="mr-6"></Text>
      </View>
      <View className="p-6">
        <Text className="mb-2 text-xl font-medium leading-tight">
            {translate(material?.material_description_title)}:
        </Text>
        <ScrollView 
          className="h-[35%] w-full"
        >
          <View className="container p-2">
            <Text className="mb-4 text-base">
              {translate(material?.material_description)}
            </Text>
          </View>
        </ScrollView>
        {/* <Text className="mb-1 text-xl font-medium leading-tight">
          Note:
        </Text>
        <Text className="my-2 text-base">
            If you're ready, you may proceed for the material by pressing <Text className="px-2 italic font-bold">start</Text> button, If no, try another material by pressing <Text className="px-2 italic font-bold">another material</Text>.
        </Text> */}

          <TouchableOpacity
            onPress={() => handleQuestionsList()}
            className="inline-block rounded bg-blue-400 px-6 pb-2 pt-2.5"
          >
            <Text className="text-xs font-medium capitalize leading-normal text-white text-center">{translate("start")}</Text>
          </TouchableOpacity>
          
      </View>
    </View>
  )
}
