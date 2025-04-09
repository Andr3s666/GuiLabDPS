import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';

export default function AddTaskScreen({ navigation, route }) {
  const { setTasks } = route.params; 
  // Recibimos la función setTasks, que actualiza la lista de tareas.
  
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [team, setTeam] = useState('');
  const [deadline, setDeadline] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  //Estados locales inicializados para editar

  const handleSubmit = () => {
    if (!title || !subject) {
      Alert.alert('Faltan campos', 'Por favor completa el nombre y la materia.');
      return;
    }

    // Crear la nueva tarea
    const newTask = {
      title,
      subject,
      team,
      deadline,
    };

    // Agregar la tarea al estado de HomeScreen
    setTasks((prevTasks) => [...prevTasks, newTask]);

    Alert.alert('¡Actividad registrada!');
    navigation.goBack(); // Volver a la pantalla principal
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || deadline;
    setShowPicker(false); // Siempre ocultar el picker
    setDeadline(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nueva Actividad</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de la actividad"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Materia o categoría"
        value={subject}
        onChangeText={setSubject}
      />
      <TextInput
        style={styles.input}
        placeholder="Equipo de trabajo (opcional)"
        value={team}
        onChangeText={setTeam}
      />

      <Button title="Seleccionar fecha de entrega" onPress={showDatePicker} />
      <Text style={styles.deadlineText}>
        Entrega: {deadline.toLocaleDateString()} {deadline.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>

      {showPicker && (
        <DateTimePicker
        value={deadline}
        mode="date" // tuve que cambiar de datetime
        display="default"
        onChange={onDateChange}
      />
      )}

      <Button title="Guardar actividad" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  deadlineText: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
    color: '#444',
  },
});
