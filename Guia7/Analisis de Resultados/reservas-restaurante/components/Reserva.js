import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';

const Reserva = ({ item, eliminarReserva }) => {
  return (
    <View style={styles.reserva}>
      <View>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.texto}>{item.nombre}</Text>
      </View>
      
      <View>
        <Text style={styles.label}>Fecha:</Text>
        <Text style={styles.texto}>{item.fecha} a las {item.hora}</Text>
      </View>
      
      <View>
        <Text style={styles.label}>Personas:</Text>
        <Text style={styles.texto}>{item.personas}</Text>
      </View>
      
      <View>
        <Text style={styles.label}>Sección:</Text>
        <Text style={styles.texto}>{item.seccion}</Text>
      </View>
      
      <TouchableHighlight 
        onPress={() => eliminarReserva(item.id)} 
        style={styles.btnEliminar}
      >
        <Text style={styles.textoEliminar}>Cancelar Reserva</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  reserva: {
    backgroundColor: '#FFF',
    borderBottomColor: '#e1e1e1',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 10
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    color: '#333'
  },
  texto: {
    fontSize: 16,
    color: '#555'
  },
  btnEliminar: {
    padding: 10,
    backgroundColor: '#c33',
    marginVertical: 10,
    borderRadius: 5
  },
  textoEliminar: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default Reserva;