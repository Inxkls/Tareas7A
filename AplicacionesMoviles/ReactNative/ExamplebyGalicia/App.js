import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './AuthContext'; 
import AppNavigator from './navigation/AppNavigator';
import { StatusBar } from 'react-native';

export default function App() {
  return (

    <AuthProvider>
      <StatusBar barStyle="default" />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
