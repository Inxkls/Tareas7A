import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { auth } from './firebaseConfig';

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);


  const handleLogin = async() => {
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password)
      setUser(userCredentials.user);
    } catch (error) {
      Alert.alert("Login error", error.message);
    }
  }

  const handleSignUp = async() => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
      setUser(userCredentials.user);
    } catch (error) {
      Alert.alert("Signup error", error.message);
    }
  }

  const handleLogout = async() => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      Alert.alert("Logout error", error.message);
    }
  }

  const handleRefresh = async() => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const token = await currentUser.getIdToken(true); // Force refresh
        Alert.alert("Token refreshed", token);
      } else {
        Alert.alert("No user is logged in");
      }
    } catch (error) {
      Alert.alert("Token refresh error", error.message);
    }
  }

  return (
    <View style={styles.container}>
      {
        user ? (
          <>
            <Text style={styles.titulo}>Welcome, {user.email}</Text>
            <Button 
              title="Logout" 
              onPress={handleLogout} />
               <Button 
              title="Refresh Token" 
              onPress={handleRefresh} />
          </>

        ) : (
          <>
          <Text style={styles.titulo}>Firebase Authentication</Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          <Button title="Login" onPress={handleLogin} />
          <Button title="Sign Up" onPress={handleSignUp} />
          </>

        ) 
  
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    width: "100%",
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#490de0ff",
    borderRadius: 5,
  },
  titulo:{
    fontSize: 24,
    color: 'blue',
    marginBottom: 20,
  }
});