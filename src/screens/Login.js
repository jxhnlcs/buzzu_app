import React from 'react';
import { View, Text, Button, TouchableOpacity, Image, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.background}>
      <View style={styles.container}>

        <Image source={require('../assets/img/buzzu.png')} style={styles.imageBuzzu} />
        <Image source={require('../assets/img/bus.png')} style={styles.imageBus} />

        <Text style={styles.text}>Viaje com segurança</Text>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.startButtonText}>Começar</Text>

          <Image source={require('../assets/img/seta.png')} style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0734BD',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 20,
  },

  imageBuzzu: {
    width: 200,
    height: 100,
    marginVertical: 10,
  },

  imageBus: {
    width: 250,
    height: 250,
    marginVertical: 10,
  },

  text: {
    color: 'white',
    fontSize: 24,
  },

  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    width: 340,
    height: 63,
    padding: 10,
    marginTop: 100,
    borderRadius: 12,
  },

  startButtonText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
  },

  arrowIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF',
  },
});

export default HomeScreen;