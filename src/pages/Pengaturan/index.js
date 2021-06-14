import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import Pengaturan from './Pengaturan';
import GantiPassword from './GantiPassword';

const Stack = createSharedElementStackNavigator();
function PengaturanNavigation(props) {
  return (
    <>
      <Stack.Navigator initialRouteName = "Pengaturan" headerMode="none">
        <Stack.Screen name="Pengaturan" component={Pengaturan} initialParams={{ data: props.route.params }}/>
        <Stack.Screen name="GantiPassword" component={GantiPassword}/>
      </Stack.Navigator>
    </>
  );
}

export default PengaturanNavigation;