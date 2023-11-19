import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { AntDesign } from '@expo/vector-icons'; // Importando o ícone da lupa
import * as Location from 'expo-location';

export default function App() {
  const [busLocation, setBusLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão para acesso à localização foi negada.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setBusLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  if (!busLocation) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: busLocation.latitude,
          longitude: busLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude: busLocation.latitude, longitude: busLocation.longitude }}>
          <View style={styles.userMarker} />
        </Marker>
      </MapView>

      <View style={styles.rectangleContainer}>
        <View style={styles.rectangle}>
          <TouchableOpacity style={styles.button}>
            <AntDesign name="search1" size={24} color="white" style={styles.searchIcon} />
            <Text style={styles.buttonText}>Para onde vamos?</Text>
          </TouchableOpacity>
        </View>
      </View>

      {errorMsg && <Text>{errorMsg}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  userMarker: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: '#3B82F6',
    borderWidth: 3,
    borderColor: '#E0ECFF',
  },
  rectangleContainer: {
    position: 'absolute',
    bottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  rectangle: {
    backgroundColor: 'white',
    width: 365,
    height: 185,
    padding: 16,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'gray',
  },
  button: {
    backgroundColor: '#076DDB',
    borderColor: '#3B82F6',
    borderWidth: 2,
    borderRadius: 8,
    width: 329, // largura desejada
    height: 49, // altura desejada
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchIcon: {
    marginRight: 10,
  },
});
