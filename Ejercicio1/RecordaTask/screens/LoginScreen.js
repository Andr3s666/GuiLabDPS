import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  //Guarda los valores ingresados
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //Funcion que valida los campos
  const handleLogin = async () => {
    if (!email || !password) {
      alert('Por favor completa todos los campos');
      return;
    }
  //Obtiene los datos del usuario guardado
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const { email: storedEmail, password: storedPassword } = JSON.parse(storedUser);
        //Si existe un usuario lo recibe en json y modifica a formato javascript
        //Si coinciden los campos me redirige a la pantalla Home
        if (email === storedEmail && password === storedPassword) {
          navigation.replace('Home');
          //Validaciones o excepciones de errores
        } else {
          alert('Correo o contraseña incorrectos');
        }
      } else {
        alert('No hay usuarios registrados');
      }
    } catch (error) {
      alert('Error al iniciar sesión');
    }
  };
//Vista de la Pagina Login
  return (
    <View style={styles.container}>
      <Text style={styles.title}>RecordaTask</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electronico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Iniciar Sesión" onPress={handleLogin} />

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>¿No tienes cuenta? Pulsa aquí</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  registerText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#007bff',
  },
});
