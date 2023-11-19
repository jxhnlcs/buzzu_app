import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';

export default function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [busLocations, setBusLocations] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [lastDestinations, setLastDestinations] = useState([
    'Shopping Boulevard',
    'Parque da Cidade',
  ]);
  const BusIcon = require('../assets/img/busIcon.png');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão para acesso à localização foi negada.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      // Exemplo de adição de 20 ônibus com localizações simuladas aleatórias próximas à localização do usuário
      const buses = Array.from({ length: 5 }, (_, index) => ({
        latitude: location.coords.latitude + (Math.random() * 0.01 - 0.005), // Variação pequena na latitude
        longitude: location.coords.longitude + (Math.random() * 0.01 - 0.005), // Variação pequena na longitude
        id: index.toString(), // ID único para cada ônibus
      }));
      setBusLocations(buses);
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulando o movimento dos ônibus (adicionando pequenas variações às localizações)
      if (busLocations.length > 0) {
        const updatedBuses = busLocations.map(bus => ({
          ...bus,
          latitude: bus.latitude + (Math.random() * 0.0001 - 0.00005), // Variação pequena na latitude
          longitude: bus.longitude + (Math.random() * 0.0001 - 0.00005), // Variação pequena na longitude
        }));
        setBusLocations(updatedBuses);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [busLocations]);

  if (!busLocations) {
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
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        <Marker coordinate={{ latitude: userLocation.latitude, longitude: userLocation.longitude }}>
          <View style={styles.userMarker} />
        </Marker>

        {busLocations.map(bus => (
          <Marker key={bus.id} coordinate={{ latitude: bus.latitude, longitude: bus.longitude }}>
            <Image source={BusIcon} style={styles.busImage} />
          </Marker>
        ))}
      </MapView>

      <TouchableOpacity style={styles.menuButton}>
        <MaterialIcons name="menu" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuLocation}>
        <MaterialIcons name="my-location" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.temp}>
        <MaterialIcons name="wb-sunny" size={18} color="yellow" />
        <Text style={styles.tempText}>39°</Text>
      </TouchableOpacity>



      <View style={styles.rectangleContainer}>
        <View style={styles.rectangle}>
          <TouchableOpacity style={styles.button}>
            <AntDesign name="search1" size={24} color="white" style={styles.searchIcon} />
            <Text style={styles.buttonText}>Para onde vamos?</Text>
          </TouchableOpacity>
          <View style={styles.historyContainer}>
            {lastDestinations.map((destination, index) => (
              <View key={index} style={styles.destinationContainer}>
                <AntDesign name="clockcircleo" size={24} color="gray" style={styles.destinationIcon} />
                <Text style={styles.lastDestinationText}>{destination}</Text>
              </View>
            ))}
            <View style={styles.separator}></View>
          </View>
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
  busImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
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
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 128, 0.5)',
  },
  button: {
    backgroundColor: '#076DDB',
    borderColor: '#3B82F6',
    borderWidth: 2,
    borderRadius: 8,
    width: 329,
    height: 49,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  historyContainer: {
    marginTop: 10,
    marginLeft: 7
  },
  destinationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  destinationIcon: {
    marginRight: 10,
  },
  lastDestinationText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    opacity: 0.2,
    top: -55,
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menuLocation: {
    position: 'absolute',
    bottom: 210,
    right: 20,
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  temp: {
    position: 'absolute',
    display:'flex',
    bottom: 210,
    right: 300,
    width: 60,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "row",
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  tempText:{
    color:'black',
    fontSize:10,
    fontWeight:'bold',
    
  },
});
