import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Home'
import Pengaturan from '../Pengaturan'
import Notifikasi from '../Notifikasi'
import Tabungan from '../Tabungan'
import Rencana from '../Rencana'


const Stack = createStackNavigator();

function HomeNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      screenOptions={{
        headerShown: false
      }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Pengaturan" component={Pengaturan} />
        <Stack.Screen name="Notifikasi" component={Notifikasi} />
        <Stack.Screen name="Tabungan" component={Tabungan} />
        <Stack.Screen name="Rencana" component={Rencana} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default HomeNavigation;