import React from 'react';
import { NavigationContainer, DefaultTheme  } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import Home from './Home'
import Pengaturan from '../Pengaturan'
import Notifikasi from '../Notifikasi'
import TabunganNavigation from '../Tabungan'
import ArtikelNavigation from '../Artikel'
import RencanaNavigation from '../Rencana'
import DetailArtikel from '../Artikel/DetailArtikel'
import DetailRencana from '../Rencana/DetailRencana';

const Stack = createSharedElementStackNavigator();

function HomeNavigation() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white'
    },
  }
  return (
    <>
      <Stack.Navigator 
      screenOptions={{
        headerShown: false
      }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Pengaturan" component={Pengaturan} />
        <Stack.Screen name="Notifikasi" component={Notifikasi} />
        <Stack.Screen name="TabunganNavigation" component={TabunganNavigation}/>
        <Stack.Screen name="ArtikelNavigation" component={ArtikelNavigation}/>
        <Stack.Screen name="RencanaNavigation" component={RencanaNavigation} />
        <Stack.Screen name="DetailRencana" component={DetailRencana} />
        <Stack.Screen name="DetailArtikel" component={DetailArtikel} 
        options={{
          gestureEnabled: false,
            transitionSpec:{
                open: {animation: 'timing', config: {duration: 300}},
                close: {animation: 'timing', config: {duration: 300}},
            },
            cardStyleInterpolator:({current: {progress}})=>{
                return {
                    cardStyle: {
                        opacity: progress
                    }
                }
            }
        }}
        />
      </Stack.Navigator>
    </>
  );
}

export default HomeNavigation;