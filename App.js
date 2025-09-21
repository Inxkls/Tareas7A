import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

 

export default function App() {

  const buscaLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return Alert.alert('Permiso denegado')
    }
    const location= await Location.getCurrentPositionAsync({})
    console.log(location)
}

  useEffect(() => {
    buscaLocation();
  })

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <MapView style={styles.mapa}>
        <Marker
          coordinate={{latitude: 23.752388, longitude: -999.142277}}
          title="Mi ubicación"
          description="Estoy aquí"
        />
      </MapView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  mapa: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  container: {
    flex: 1,
    backgroundColor: '#440a0aff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})