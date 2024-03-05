import React from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const KeyboardAvoidingTemplate = ({ children }) => {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#fff' }} 
      edges={
        Platform.OS === 'ios' ? 
        (!hasBg ? ['top', 'left', 'right'] : ['left', 'right'] )
          : ['top', 'left', 'right', 'bottom']
        }
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, backgroundColor: '#EEEEEE' }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -135}
      >
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
