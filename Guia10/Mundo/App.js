import { StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Paises from './Screens/Paises';
import Maravillas from './Screens/Maravillas';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarInactiveTintColor: "#f48b28",
          tabBarActiveTintColor: "#633204",
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Paises') {
              iconName = Platform.OS === 'ios' ? 'home-outline' : 'home';
            } else if (route.name === 'Maravilla') {
              iconName = Platform.OS === 'ios' ? 'list-outline' : 'list';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Paises" component={Paises} />
        <Tab.Screen name="Maravilla" component={Maravillas} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
