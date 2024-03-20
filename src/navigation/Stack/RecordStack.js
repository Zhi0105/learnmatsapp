import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { RecordScreen } from '@_screens/Account/Record/RecordScreen'

export const RecordStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Record"
      screenOptions={{ headerShown: false }}  
    >
       <Stack.Screen  
        name="Record" component={RecordScreen} 
        options={{
          animation:'slide_from_right'
        }}
      />
    </Stack.Navigator>
  )
}
