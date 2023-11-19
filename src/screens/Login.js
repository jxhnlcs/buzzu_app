import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native";

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

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TouchableOpacity>
          <Text style={styles.link}>Não tem conta?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.customButton}
          onPress={handleLogin}
          disabled={email === "" || senha === ""}
        >
          <Text style={styles.customButtonText}>Entrar</Text>
        </TouchableOpacity>


        <View style={styles.orContainer}>
          <View style={styles.orLine} />
          <Text style={styles.orText}>ou</Text>
          <View style={styles.orLine} />
        </View>

        <TouchableOpacity style={styles.continueWithGoogleButton}>
          <View style={styles.googleContainer}>
            <Image
              source={require('../assets/img/google.png')}
              style={styles.googleLogo}
            />
            <Text style={styles.continueWithGoogleText}>Continuar com o Google</Text>
          </View>
        </TouchableOpacity>
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

  imageBuzzu: {
    width: 200,
    height: 100,
    marginVertical: 10,
  },

  label: {
    color: "#FFFFFF",
    alignSelf: "flex-start",
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 25,
  },

  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 20,
    height: 59,
    marginBottom: 10,
    backgroundColor: "#D9D9D9",
    width: 340,
  },

  customButton: {
    backgroundColor: "#1F2937",
    borderRadius: 10,
    height: 60,
    width: 340,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  link: {
    color: "#FFFFFF",
    textDecorationLine: "underline",
    marginTop: 5,
    marginLeft: 230,
    fontWeight: 'bold',
    fontSize: 16,
  },

  customButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginVertical: 10,
  },

  orLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#FFFFFF",
  },

  orText: {
    color: "#FFFFFF",
    marginHorizontal: 10,
    fontWeight: "bold",
  },

  continueWithGoogleButton: {
    backgroundColor: "#FFFFFF1A",
    borderRadius: 5,
    marginTop: 10,
    width: 340,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  googleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  googleLogo: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  continueWithGoogleText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },

});

export default App;