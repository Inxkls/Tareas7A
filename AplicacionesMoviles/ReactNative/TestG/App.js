// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import NotesScreen from './screens/NotesScreen';
import WeatherScreen from './screens/WeatherScreen';
import CalendarScreen from './screens/CalendarScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2563eb',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Mi App Personal' }}
        />
        <Stack.Screen
          name="Notes"
          component={NotesScreen}
          options={{
            title: 'Mis Notas',
            headerBackTitle: 'Inicio'
          }}
        />
        <Stack.Screen
          name="Weather"
          component={WeatherScreen}
          options={{
            title: 'El Clima',
            headerBackTitle: 'Inicio'
          }}
        />
        <Stack.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            title: 'Calendario',
            headerBackTitle: 'Inicio'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
