import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MaravillasList from './ListaMaravillas';
import Detalle from './DetalleMaravillas';

const Stack = createStackNavigator();

const Maravillas = () => (
  <Stack.Navigator initialRouteName="Maravillas">
    <Stack.Screen name="Maravillas" component={MaravillasList} options={{ headerShown: false }} />
    <Stack.Screen name="Consejos" component={Detalle} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default Maravillas;
