import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';

import { HomeScreen } from '@_screens/Account/HomeScreen';
import { SettingsScreen } from '@_screens/Account/SettingsScreen';
import { LogoutScreen } from '@_screens/Account/LogoutScreen';

export const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      initialRouteName='Home'
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Signout" component={LogoutScreen} />
    </Drawer.Navigator>
  )
}