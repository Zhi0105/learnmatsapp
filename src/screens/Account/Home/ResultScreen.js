import React from 'react'
import { Result } from '@_components/Pages/Account/Home/Result/Result'
import { KeyboardAvoidingTemplate } from '@_components/Templates/KeyboardAvoidingTemplate'

export const ResultScreen = ({ route, navigation }) => {
  return (
    <KeyboardAvoidingTemplate>
      <Result route={route} navigation={navigation} />
    </KeyboardAvoidingTemplate>
  )
}
