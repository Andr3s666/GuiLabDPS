import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';


export default function EditTaskScreen({ navigation, route }) {
  const { task, index, setTasks } = route.params;
// Se reciben los parámetros pasados desde la pantalla anterior:
  const [title, setTitle] = useState(task.title);
  const [subject, setSubject] = useState(task.subject);
  const [team, setTeam] = useState(task.team);
  const [deadline, setDeadline] = useState(new Date(task.deadline));
  const [showPicker, setShowPicker] = useState(false);
// Se inicializan los estados con los valores actuales de la tarea
  const handleSubmit = () => {
    if (!title || !subject) {
      Alert.alert('Campos requeridos', 'Completa al menos el título y la materia');
      return;
    }

    const updatedTask = { title, subject, team, deadline };
// Se crea un nuevo objeto con los valores actualizados
    setTasks(prev => {
      const copy = [...prev]; // Copia el array de tareas anterior
      copy[index] = updatedTask;// Reemplaza la tarea en la posición correspondiente
      return copy;// Devuelve la nueva lista
    });

    Alert.alert('Tarea actualizada');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Actividad</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Título" />
      <TextInput style={styles.input} value={subject} onChangeText={setSubject} placeholder="Materia" />
      <TextInput style={styles.input} value={team} onChangeText={setTeam} placeholder="Equipo de trabajo (opcional)" />

      <Button title="Cambiar fecha de entrega" onPress={() => setShowPicker(true)} />
      <Text style={styles.deadlineText}>
        {deadline.toLocaleDateString()} {deadline.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>

      {showPicker && (
        <DateTimePicker
          value={deadline}
          mode="datetime"
          display="default"
          onChange={(event, selectedDate) => {
            setShowPicker(Platform.OS === 'ios');
            if (selectedDate) setDeadline(selectedDate);
          }}
        />
      )}

      <Button title="Guardar cambios" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 25, textAlign: 'center' },
  input: { height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingHorizontal: 15, marginBottom: 15 },
  deadlineText: { marginVertical: 15, fontSize: 16, textAlign: 'center', color: '#444' },
});
