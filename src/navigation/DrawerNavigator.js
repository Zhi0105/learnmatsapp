import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';

import { SettingsScreen } from '@_screens/Account/SettingsScreen';
import { LogoutScreen } from '@_screens/Account/LogoutScreen';

import { HomeStack } from './Stack/HomeStack';

export const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      initialRouteName='HomeStack'
      screenOptions={{
        headerTitle: 'Alabang Elementary School',
        headerStyle: {
          backgroundColor: '#075985',
        },
        headerTintColor: '#fff',
        headerTitleAlign: "center"
      }}
    >
      <Drawer.Screen 
        name="HomeStack"  component={HomeStack}
        options={{ drawerLabel: "Home" }}
      />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Signout" component={LogoutScreen} />
    </Drawer.Navigator>
  )
}