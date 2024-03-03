import React from 'react'
import { Text, View } from 'react-native'
import { StyledComponent } from 'nativewind'

const App = () => {
  return (
    <StyledComponent component={View} className="min-h-screen flex justify-center items-center">
      <StyledComponent component={Text} className="text-xl text-red-500">
          Hello from learn material application
      </StyledComponent>
    </StyledComponent>

  )
}

export default App;
