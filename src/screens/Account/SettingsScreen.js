import React from 'react'
import { Settings } from '@_components/Pages/Account/Settings'
import { KeyboardAvoidingTemplate } from '@_components/Templates/KeyboardAvoidingTemplate'

export const SettingsScreen = ({ navigation }) => {
  return (
    <KeyboardAvoidingTemplate>
      <Settings navigation={navigation} />
    </KeyboardAvoidingTemplate>
  )
}
