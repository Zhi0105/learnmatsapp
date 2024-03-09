import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { HomeScreen } from '@_screens/Account/HomeScreen'
import { MaterialDetailScreen } from '@_screens/Account/Home/MaterialDetailScreen'

export const HomeStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}  
    >
      <Stack.Screen  
        name="Home" component={HomeScreen} 
        options={{
          animation:'slide_from_right'
      }}
      />

      <Stack.Screen  
        name="Material" component={MaterialDetailScreen} 
        options={{
          animation:'slide_from_right'
      }}
      />
  </Stack.Navigator>
  )
}