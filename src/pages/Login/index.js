import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { NavigationContainer, DefaultTheme  } from '@react-navigation/native';

import Login from './Login';
import Register from './Register';

const Stack = createSharedElementStackNavigator();

function LoginNavigation() {
    const theme = {
        ...DefaultTheme,
        colors: {
        ...DefaultTheme.colors,
        background: 'white'
        },
    }
  return (
    <>
      <Stack.Navigator initialRouteName = "Login" headerMode="none">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </>
  );
}

export default LoginNavigation;