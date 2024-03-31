import React from 'react'
import { KeyboardAvoidingTemplate } from '@_components/Templates/KeyboardAvoidingTemplate'
import { Material } from '@_components/Pages/Account/Home/Material/Material'

export const MaterialScreen = ({ route, navigation }) => {
  return (
    <KeyboardAvoidingTemplate>
      <Material route={route} navigation={navigation} />
    </KeyboardAvoidingTemplate>
  )
}
