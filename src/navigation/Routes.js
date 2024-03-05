import React from 'react'
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { StackNavigator } from './StackNavigator';

export const Routes = () => {
  const navigationRef = useNavigationContainerRef();

  return (
    <NavigationContainer ref={navigationRef}>
      <StackNavigator />
    </NavigationContainer>
  )
}
