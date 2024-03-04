import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { StyledComponent } from 'nativewind'
import SplashScreen from 'react-native-splash-screen'

const App = () => {

  useEffect(() => {
    if(Platform.OS === 'android') { SplashScreen.hide() }
  }, [])

  return (
    <StyledComponent component={View} className="min-h-screen flex justify-center items-center">
      <StyledComponent component={Text} className="text-xl text-red-500">
          Hello from learn material application
      </StyledComponent>
    </StyledComponent>

  )
}

export default App;
