import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { NavigationContainer, DefaultTheme  } from '@react-navigation/native';

import HomeNavigation from '../Home';
import LoginNavigation from '../Login';
import Blank from '../Loading/Blank';

const Stack = createSharedElementStackNavigator();

function ArtikelNavigation() {
  const theme = {
      ...DefaultTheme,
      colors: {
      ...DefaultTheme.colors,
      background: 'white'
      },
  }
  
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName = "Blank" headerMode="none">
        <Stack.Screen name="Blank" component={Blank} />
        <Stack.Screen name="LoginNavigation" component={LoginNavigation} />
        <Stack.Screen name="HomeNavigation" component={HomeNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ArtikelNavigation;