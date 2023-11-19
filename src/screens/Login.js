import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image } from "react-native";

const App = ({ navigation }) => {
  const [email, setEmail] = useState("exemplo@email.com");
  const [senha, setSenha] = useState("senha");


  const handleLogin = () => {
    if (email === "exemplo@email.com" && senha === "senha") {
      navigation.navigate('Home');
    } else {
      // Lógica de tratamento de erro ou exibição de mensagem
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Image source={require('../assets/img/buzzu.png')} style={styles.imageBuzzu} />
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
        </View>
        <View style={styles.buttons}>
          <Button
            title="Entrar"
            onPress={handleLogin}
            disabled={email === "" || senha === ""}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0734BD",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  imageBuzzu: {
    width: 200,
    height: 100,
    marginVertical: 10,
  },
  form: {
    width: 300,
    margin: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
  },
  buttons: {
    flexDirection: "row",
    marginTop: 20,
  },
});

export default App;