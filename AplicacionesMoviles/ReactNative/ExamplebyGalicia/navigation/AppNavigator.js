// navigation/AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../AuthContext'; // <--- Importa el hook

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { userToken } = useAuth();

  return (
    <Stack.Navigator>
      {}
      {userToken == null ? (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Iniciar Sesión' }}
        />
      ) : (
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Mi App' }}
        />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
