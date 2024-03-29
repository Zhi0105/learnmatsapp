import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';

import { SettingsScreen } from '@_screens/Account/SettingsScreen';
import { LogoutScreen } from '@_screens/Account/LogoutScreen';
import { ProfileScreen } from '@_screens/Account/ProfileScreen';
import { HomeStack } from './Stack/HomeStack';
import { RecordStack } from './Stack/RecordStack';

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
        options={{ drawerLabel: "Dashboard" }}
      />
      <Drawer.Screen 
        name="Profile"  component={ProfileScreen}
      />
      <Drawer.Screen 
        name="RecordStack"  component={RecordStack}
        options={{ drawerLabel: "History" }}
      />
      
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Signout" component={LogoutScreen} />
    </Drawer.Navigator>
  )
}