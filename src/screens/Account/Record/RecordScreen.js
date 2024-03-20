import React from 'react'
import { Record } from '@_components/Pages/Account/Record/Record'
import { KeyboardAvoidingTemplate } from '@_components/Templates/KeyboardAvoidingTemplate'


export const RecordScreen = ({ navigation, route }) => {
  return (
    <KeyboardAvoidingTemplate>
      <Record route={route} navigation={navigation} />
    </KeyboardAvoidingTemplate>
  )
}
