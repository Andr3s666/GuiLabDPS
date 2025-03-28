import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StepsScreen from './src/screens/StepsScreen';

const Stack = createStackNavigator();

export default function App() {
  const steps = [
    { title: 'Rechazar', description: 'Evitar productos que generan residuos innecesarios' },
    { title: 'Reducir',  description: 'Minimizar el consumo y el desperdicio' },
    { title: 'Reutilizar',  description: 'Dar una segunda vida a los objetos' },
    { title: 'Reciclar',  description: 'Transformar residuos en nuevos productos.' },
    { title: 'Recuperar',  description: 'Aprovechar materiales para generar energía u otros usos.' },
  ];

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="5 R de Reciclaje">
          {(props) => <StepsScreen {...props} steps={steps} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}