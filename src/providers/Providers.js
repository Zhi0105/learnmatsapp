import React from 'react'
import { Routes } from '@_navigation/Routes'
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message'

import { TanstackProviders } from './TanstackProviders'
import { AuthProviders } from './AuthProviders'
import { LanguageProviders } from './LanguageProviders';
import { TranslationProviders } from './TranslationProviders';
import { ClasslevelProviders } from './ClasslevelProviders';
import { MaterialProviders } from './MaterialProviders';
import { NativeBaseProvider } from 'native-base'

export const Providers = () => {
  const navigationRef = useNavigationContainerRef();

  return (
    <React.Fragment>
      <NavigationContainer ref={navigationRef}>
          <NativeBaseProvider>
            <TanstackProviders>
              <AuthProviders>
                <LanguageProviders>
                  <TranslationProviders>
                    <ClasslevelProviders>
                      <MaterialProviders>
                        <Routes />
                        <FlashMessage position="top" floating={false} />                        
                      </MaterialProviders>
                    </ClasslevelProviders>
                  </TranslationProviders>
                </LanguageProviders>
              </AuthProviders>
            </TanstackProviders>
          </NativeBaseProvider>  
      </NavigationContainer>
    </React.Fragment>
  )
}
