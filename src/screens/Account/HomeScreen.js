import React from 'react'
import { Home } from '@_components/Pages/Account/Home'
import { KeyboardAvoidingTemplate } from '@_components/Templates/KeyboardAvoidingTemplate'

export const HomeScreen = ({ navigation }) => {
  return (
    <KeyboardAvoidingTemplate>
      <Home navigation={navigation} />
    </KeyboardAvoidingTemplate>
  )
}
