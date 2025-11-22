// screens/LoginScreen.js
import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { useAuth } from '../AuthContext';

const LoginScreen = () => {
  const { login } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>App de Prueba</Text>
      <Button
        title="Entrar (Simular Login)"
        onPress={() => login('mi-token-falso-123')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, marginBottom: 20 }
});

export default LoginScreen;
