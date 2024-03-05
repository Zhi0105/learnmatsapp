import React from 'react'
import { Routes } from '@_navigation/Routes'
import FlashMessage from 'react-native-flash-message'

export const Providers = () => {
  return (
    <React.Fragment>
      <Routes />
      <FlashMessage position="top" floating={false} />
    </React.Fragment>
  )
}
