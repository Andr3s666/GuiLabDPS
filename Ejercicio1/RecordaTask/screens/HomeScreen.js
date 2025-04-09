import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  //Estado local para guardar las tareas
  //Cargar tareas al iniciar
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const stored = await AsyncStorage.getItem('tasks');
        if (stored) setTasks(JSON.parse(stored));
      } catch (e) {
        console.log('Error al cargar tareas:', e);
      }
    };
    loadTasks();
  }, []);

  // Guardar tareas cuando cambien
  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (e) {
        console.log('Error al guardar tareas:', e);
      }
    };
    saveTasks();
  }, [tasks]);

  const handleDelete = (index) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.taskItem}>
      <View style={styles.taskHeader}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => navigation.navigate('EditTask', { task: item, index, setTasks })}>
            <Ionicons name="create-outline" size={22} color="#007bff" style={{ marginRight: 10 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(index)}>
            <Ionicons name="trash-outline" size={22} color="#dc3545" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.taskSubtitle}>Materia: {item.subject}</Text>
      <Text style={styles.taskSubtitle}>Entrega: {new Date(item.deadline).toLocaleString()}</Text>
      <Text style={styles.taskSubtitle}>Descripción: {item.description}</Text> 
    </View>
  );

  return (
    <View style={styles.container}>
      {tasks.length === 0 ? (
        <Text style={styles.emptyText}>No hay actividades registradas.</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddTask', { setTasks })}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f7f7f7' },
  emptyText: { textAlign: 'center', color: '#666', marginTop: 40, fontSize: 16 },
  fab: {
    position: 'absolute', bottom: 30, right: 30,
    backgroundColor: '#007bff', width: 60, height: 60,
    borderRadius: 30, alignItems: 'center', justifyContent: 'center',
    elevation: 5, shadowColor: '#000', shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  taskItem: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10 },
  taskTitle: { fontSize: 16, fontWeight: 'bold' },
  taskSubtitle: { fontSize: 14, color: '#666', marginTop: 5 },
  taskHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  actions: { flexDirection: 'row', alignItems: 'center' },
});
