import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import Artikel from './Artikel'
import DetailArtikel from './DetailArtikel'
import BuatArtikel from './BuatArtikel'

const Stack = createSharedElementStackNavigator();

function ArtikelNavigation(props) {
  return (
    <>
      <Stack.Navigator initialRouteName = "Artikel" headerMode="none">
        <Stack.Screen name="Artikel" component={Artikel} initialParams={{id: props.route.params.id, name: props.route.params.name}}/>
        <Stack.Screen name="BuatArtikel" component={BuatArtikel} />
        <Stack.Screen name="DetailArtikel" 
            component={DetailArtikel}
            options={{
                gestureEnabled: false,
                transitionSpec:{
                    open: {animation: 'timing', config: {duration: 100}},
                    close: {animation: 'timing', config: {duration: 100}},
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

export default ArtikelNavigation;