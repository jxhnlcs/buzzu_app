import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { AntDesign } from '@expo/vector-icons';
import * as Location from 'expo-location';
import Animated from 'react-native-reanimated';

const { Value, event, block, cond, set, clockRunning, startClock, stopClock, timing, Easing } = Animated;

export default function App() {
  const [busLocation, setBusLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [lastDestinations, setLastDestinations] = useState(['Shopping Boulevard', 'Parque da Cidade']);
  const translateX = new Value(0);
  const translateY = new Value(0);
  const markerAnimation = new Value(0);

  const clock = new Animated.Clock();
  const startAnimation = clockRunning(clock);

  const runTiming = (clock, value, dest, duration) => {
    const state = {
      finished: new Value(0),
      position: value,
      time: new Value(0),
      frameTime: new Value(0),
    };

    const config = {
      duration,
      toValue: dest,
      easing: Easing.inOut(Easing.ease),
    };

    return block([
      cond(clockRunning(clock), 0, [
        set(state.finished, 0),
        set(state.time, 0),
        set(state.frameTime, 0),
        set(state.position, value),
        startClock(clock),
      ]),
      timing(clock, state, config),
      cond(state.finished, stopClock(clock)),
      state.position,
    ]);
  };

  useEffect(() => {
    const getLocationAsync = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão para acesso à localização foi negada.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setBusLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      const newLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      Animated.parallel([
        set(markerAnimation, 1),
        cond(startAnimation, [
          set(translateX, runTiming(clock, translateX, newLocation.longitude, 500)),
          set(translateY, runTiming(clock, translateY, newLocation.latitude, 500)),
        ]),
      ]).start();
    };

    getLocationAsync();
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
        <Animated.View
          style={[
            styles.userMarker,
            {
              transform: [
                {
                  translateX: Animated.interpolate(markerAnimation, {
                    inputRange: [0, 1],
                    outputRange: [0, translateX],
                  }),
                },
                {
                  translateY: Animated.interpolate(markerAnimation, {
                    inputRange: [0, 1],
                    outputRange: [0, translateY],
                  }),
                },
              ],
            },
          ]}
        >
          <AntDesign name="car" size={24} color="white" />
        </Animated.View>
      </MapView>

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
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  searchIcon: {
    marginRight: 10,
  },
  historyContainer: {
    marginTop: 10,
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
    opacity: 0.5,
    top: -55,
  },
});
