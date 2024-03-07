import React from 'react'
import { Routes } from '@_navigation/Routes'
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message'

import { TanstackProviders } from './TanstackProviders'
import { AuthProviders } from './AuthProviders'

export const Providers = () => {
  const navigationRef = useNavigationContainerRef();

  return (
    <React.Fragment>
      <NavigationContainer ref={navigationRef}>
        <TanstackProviders>
          <AuthProviders>
            <Routes />
            <FlashMessage position="top" floating={false} />  
          </AuthProviders>
        </TanstackProviders>
      </NavigationContainer>
    </React.Fragment>
  )
}
