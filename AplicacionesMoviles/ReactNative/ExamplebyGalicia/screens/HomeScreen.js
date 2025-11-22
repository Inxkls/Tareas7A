import React, { useLayoutEffect } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { useAuth } from '../AuthContext';

const HomeScreen = ({ navigation }) => {

  const { logout, userToken } = useAuth();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Salir"
          onPress={logout}
          color="red"
        />
      ),
    });
  }, [navigation, logout]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido!</Text>
      <Text>Estás dentro de la app.</Text>
      <Text style={styles.token}>Tu token es: {userToken}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, marginBottom: 20 },
  token: { fontSize: 12, color: 'gray', marginTop: 20 }
});

export default HomeScreen;
