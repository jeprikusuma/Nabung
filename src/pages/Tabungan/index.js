import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import Tabungan from './Tabungan'
import TambahTransaksi from './TambahTransaksi'

const Stack = createSharedElementStackNavigator();

function TabunganNavigation(props) {
  return (
    <>
      <Stack.Navigator initialRouteName = "Tabungan" headerMode="none">
        <Stack.Screen name="Tabungan" component={Tabungan} initialParams ={props.route.params}/>
        <Stack.Screen name="TambahTransaksi" component={TambahTransaksi} />
      </Stack.Navigator>
    </>
  );
}

export default TabunganNavigation;