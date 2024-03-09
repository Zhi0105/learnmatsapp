import React from 'react'
import { MaterialDetail } from '@_components/Pages/Account/Home/Material/MaterialDetail'
import { KeyboardAvoidingTemplate } from '@_components/Templates/KeyboardAvoidingTemplate'

export const MaterialDetailScreen = ({ route, navigation }) => {
    
  return (
    <KeyboardAvoidingTemplate>
      <MaterialDetail navigation={navigation} route={route} />
    </KeyboardAvoidingTemplate>
  )
}
1