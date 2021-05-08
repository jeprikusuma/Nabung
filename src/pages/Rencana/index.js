import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import Rencana from './Rencana';
import TambahRencana from './TambahRencana';
import DetailRencana from './DetailRencana';

const Stack = createSharedElementStackNavigator();

function RencanaNavigation() {
  return (
    <>
      <Stack.Navigator initialRouteName = "Rencana" headerMode="none">
        <Stack.Screen name="Rencana" component={Rencana} />
        <Stack.Screen name="TambahRencana" component={TambahRencana} />
        <Stack.Screen name="DetailRencana" component={DetailRencana} />
      </Stack.Navigator>
    </>
  );
}

export default RencanaNavigation;