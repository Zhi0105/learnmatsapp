import React from 'react'
import { Questionaire } from '@_components/Pages/Account/Home/Question/Questionaire'
import { KeyboardAvoidingTemplate } from '@_components/Templates/KeyboardAvoidingTemplate'

export const QuestionaireScreen = ({ route, navigation }) => {
    
  return (
    <KeyboardAvoidingTemplate>
      <Questionaire navigation={navigation} route={route}/>
    </KeyboardAvoidingTemplate>
  )
}
1