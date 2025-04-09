import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import RegistroScreen from './screens/RegisterScreen';
import InicioScreen from './screens/HomeScreen';
import TareaScreen from './screens/AddTaskScreen';
import EditTaskScreen from './screens/EditTaskScreen'
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegistroScreen} />
        <Stack.Screen name="Home" component={InicioScreen} />
        <Stack.Screen name="AddTask" component={TareaScreen} />
        <Stack.Screen name="EditTask" component={EditTaskScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
