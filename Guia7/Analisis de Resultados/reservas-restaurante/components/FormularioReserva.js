import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet, 
  TouchableHighlight, 
  Alert, 
  ScrollView,
  Picker
} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from "react-id-generator";
import colors from '../src/utils/colors';

const FormularioReserva = ({ reservas, setReservas, guardarMostrarForm, guardarReservasStorage }) => {
  const [nombre, setNombre] = useState('');
  const [personas, setPersonas] = useState('2');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [seccion, setSeccion] = useState('No fumadores');
  
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  // Funciones para el DateTimePicker (similar a la app de veterinaria)
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  
  const confirmarFecha = date => {
    const opciones = { year: 'numeric', month: 'long', day: '2-digit' };
    setFecha(date.toLocaleDateString('es-ES', opciones));
    hideDatePicker();
  };

  const showTimePicker = () => setTimePickerVisibility(true);
  const hideTimePicker = () => setTimePickerVisibility(false);
  
  const confirmarHora = hora => {
    const opciones = { hour: 'numeric', minute: '2-digit', hour12: false };
    setHora(hora.toLocaleString('es-ES', opciones));
    hideTimePicker();
  };

  const crearNuevaReserva = () => {
    if(!nombre.trim() || !fecha || !hora || !personas) {
      mostrarAlerta();
      return;
    }

    const reserva = { nombre, personas, fecha, hora, seccion };
    reserva.id = shortid();

    const nuevasReservas = [...reservas, reserva];
    setReservas(nuevasReservas);
    guardarReservasStorage(JSON.stringify(nuevasReservas));
    
    // Resetear formulario
    setNombre('');
    setPersonas('2');
    setFecha('');
    setHora('');
    setSeccion('No fumadores');
    guardarMostrarForm(false);
  };

  const mostrarAlerta = () => {
    Alert.alert(
      'Error',
      'Todos los campos son obligatorios',
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={styles.formulario}>
      <View style={styles.campo}>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setNombre}
          value={nombre}
          placeholder="Nombre del cliente"
        />
      </View>

      <View style={styles.campo}>
        <Text style={styles.label}>Número de personas:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPersonas}
          value={personas}
          keyboardType="numeric"
          placeholder="Ej: 2"
        />
      </View>

      <View style={styles.campo}>
        <Text style={styles.label}>Sección:</Text>
        <Picker
          selectedValue={seccion}
          style={styles.picker}
          onValueChange={(itemValue) => setSeccion(itemValue)}
        >
          <Picker.Item label="No fumadores" value="No fumadores" />
          <Picker.Item label="Fumadores" value="Fumadores" />
          <Picker.Item label="Terraza" value="Terraza" />
          <Picker.Item label="Sala VIP" value="Sala VIP" />
        </Picker>
      </View>

      <View style={styles.campo}>
        <Text style={styles.label}>Fecha:</Text>
        <Button title="Seleccionar Fecha" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={confirmarFecha}
          onCancel={hideDatePicker}
          locale="es_ES"
          minimumDate={new Date()}
        />
        <Text style={styles.fechaHora}>{fecha}</Text>
      </View>

      <View style={styles.campo}>
        <Text style={styles.label}>Hora:</Text>
        <Button title="Seleccionar Hora" onPress={showTimePicker} />
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={confirmarHora}
          onCancel={hideTimePicker}
          locale="es_ES"
        />
        <Text style={styles.fechaHora}>{hora}</Text>
      </View>

      <TouchableHighlight 
        onPress={crearNuevaReserva} 
        style={styles.btnSubmit}
      >
        <Text style={styles.textoSubmit}>Confirmar Reserva</Text>
      </TouchableHighlight>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  formulario: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  campo: {
    marginBottom: 15
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: colors.PRIMARY_COLOR
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5
  },
  fechaHora: {
    marginTop: 5,
    fontSize: 16
  },
  btnSubmit: {
    padding: 15,
    backgroundColor: colors.BUTTON_COLOR,
    marginVertical: 15,
    borderRadius: 5
  },
  textoSubmit: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16
  }
});

export default FormularioReserva;