import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Modal,
  ActivityIndicator,
  Alert,
  Linking
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Video } from 'expo-av';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

// Pantalla de Autenticación
const AuthScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    setLoading(true);
    try {
      const users = await AsyncStorage.getItem('@users');
      const parsedUsers = users ? JSON.parse(users) : [];

      if (isLogin) {
        const user = parsedUsers.find(u => u.email === email && u.password === password);
        if (user) {
          await AsyncStorage.setItem('@currentUser', JSON.stringify(user));
          navigation.replace('Main');
        } else {
          Alert.alert('Error', 'Credenciales incorrectas');
        }
      } else {
        if (parsedUsers.some(u => u.email === email)) {
          Alert.alert('Error', 'El correo ya está registrado');
          return;
        }
        const newUser = { id: Date.now().toString(), email, password };
        await AsyncStorage.setItem('@users', JSON.stringify([...parsedUsers, newUser]));
        await AsyncStorage.setItem('@currentUser', JSON.stringify(newUser));
        navigation.replace('Main');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error');
    }
    setLoading(false);
  };

  return (
    <View style={styles.authContainer}>
      <Text style={styles.authTitle}>{isLogin ? 'Iniciar Sesión' : 'Registro'}</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      <TouchableOpacity
        style={styles.button}
        onPress={handleAuth}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={() => setIsLogin(!isLogin)}
        style={styles.toggleAuth}
      >
        <Text style={styles.toggleAuthText}>
          {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia Sesión'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Componente de Media Item
const MediaItem = ({ item, onDelete, onEdit }) => (
  <View style={styles.mediaItem}>
    <Text style={styles.location}>{item.locationName}</Text>
    
    {item.isVideo ? (
      <Video
        source={{ uri: item.uri }}
        style={styles.media}
        useNativeControls
        resizeMode="cover"
      />
    ) : (
      <Image source={{ uri: item.uri }} style={styles.media} />
    )}
    
    <Text style={styles.description}>{item.description}</Text>
    
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: item.location.latitude,
        longitude: item.location.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      <Marker coordinate={item.location} />
    </MapView>
    
    <View style={styles.actions}>
      <TouchableOpacity
        style={[styles.actionButton, styles.edit]}
        onPress={() => onEdit(item)}
      >
        <Text style={styles.actionText}>Editar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.actionButton, styles.delete]}
        onPress={() => onDelete(item.id)}
      >
        <Text style={styles.actionText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// Pantalla Principal
const MainScreen = ({ navigation }) => {
  const [media, setMedia] = useState([]);
  const [currentMedia, setCurrentMedia] = useState(null);
  const [description, setDescription] = useState('');
  const [activeTab, setActiveTab] = useState('photo');
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadMedia = async () => {
      const user = await AsyncStorage.getItem('@currentUser');
      if (user) {
        const { id } = JSON.parse(user);
        const savedMedia = await AsyncStorage.getItem(`@media_${id}`);
        setMedia(savedMedia ? JSON.parse(savedMedia) : []);
      }
    };
    loadMedia();
  }, []);

  const saveMedia = async (updatedMedia) => {
    const user = await AsyncStorage.getItem('@currentUser');
    if (user) {
      const { id } = JSON.parse(user);
      await AsyncStorage.setItem(`@media_${id}`, JSON.stringify(updatedMedia));
    }
  };

  const handleCapture = async (isVideo) => {
    setLoading(true);
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permisos requeridos', 'Debes habilitar los permisos de la cámara');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: isVideo 
          ? ImagePicker.MediaTypeOptions.Videos 
          : ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
      });

      if (!result.canceled) {
        const location = await getLocation();
        const locationName = await reverseGeocode(location);
        setCurrentMedia({
          uri: result.assets[0].uri,
          isVideo,
          location,
          locationName
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Error al capturar el medio');
    }
    setLoading(false);
  };

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permisos requeridos', 'Debes habilitar los permisos de ubicación');
      return;
    }
    const { coords } = await Location.getCurrentPositionAsync();
    return coords;
  };

  const reverseGeocode = async (coords) => {
    const addresses = await Location.reverseGeocodeAsync(coords);
    return addresses[0]?.city + ', ' + addresses[0]?.region || 'Ubicación desconocida';
  };

  const handleSave = async () => {
    if (!currentMedia || !description.trim()) {
      Alert.alert('Error', 'Agrega una descripción');
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      ...currentMedia,
      description: description.trim(),
    };

    const updatedMedia = [newItem, ...media];
    setMedia(updatedMedia);
    saveMedia(updatedMedia);
    resetForm();
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setDescription(item.description);
  };

  const handleUpdate = () => {
    const updatedMedia = media.map(item => 
      item.id === editingItem.id 
        ? { ...item, description: description.trim() } 
        : item
    );
    setMedia(updatedMedia);
    saveMedia(updatedMedia);
    setEditingItem(null);
    setDescription('');
  };

  const handleDelete = (id) => {
    const updatedMedia = media.filter(item => item.id !== id);
    setMedia(updatedMedia);
    saveMedia(updatedMedia);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('@currentUser');
    navigation.replace('Auth');
  };

  const resetForm = () => {
    setCurrentMedia(null);
    setDescription('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mi Multimedia</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'photo' && styles.activeTab]}
          onPress={() => setActiveTab('photo')}
        >
          <Text style={styles.tabText}>Fotos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'video' && styles.activeTab]}
          onPress={() => setActiveTab('video')}
        >
          <Text style={styles.tabText}>Videos</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.captureButton}
        onPress={() => handleCapture(activeTab === 'video')}
        disabled={loading}
      >
        <Text style={styles.captureText}>
          {activeTab === 'photo' ? '📸 Tomar Foto' : '🎥 Grabar Video'}
        </Text>
      </TouchableOpacity>

      <TextInput
        style={styles.descriptionInput}
        placeholder="Añade una descripción..."
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {currentMedia && (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>💾 Guardar</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={media.filter(item => 
          activeTab === 'photo' ? !item.isVideo : item.isVideo
        )}
        renderItem={({ item }) => (
          <MediaItem
            item={item}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay elementos para mostrar</Text>
        }
      />

      <Modal visible={!!editingItem} animationType="slide">
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Editar Descripción</Text>
          <TextInput
            style={styles.modalInput}
            value={description}
            onChangeText={setDescription}
            multiline
            autoFocus
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancel]}
              onPress={() => setEditingItem(null)}
            >
              <Text>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.save]}
              onPress={handleUpdate}
            >
              <Text>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

// Navegación Principal
export default function AppWrapper() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Estilos
const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  authTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logout: {
    color: 'blue',
    fontWeight: '500',
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 15,
    borderRadius: 8,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    padding: 15,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#2196F3',
  },
  tabText: {
    fontWeight: '500',
  },
  captureButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  captureText: {
    color: 'white',
    fontWeight: '600',
  },
  descriptionInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    minHeight: 100,
    marginVertical: 10,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  saveText: {
    color: 'white',
    fontWeight: '600',
  },
  mediaItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  location: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  media: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  description: {
    marginVertical: 10,
    color: '#666',
  },
  map: {
    height: 150,
    borderRadius: 8,
    marginVertical: 10,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  edit: {
    backgroundColor: '#4CAF50',
  },
  delete: {
    backgroundColor: '#f44336',
  },
  actionText: {
    color: 'white',
    fontWeight: '500',
  },
  empty: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
  modal: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 15,
    minHeight: 100,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancel: {
    backgroundColor: '#e0e0e0',
  },
  save: {
    backgroundColor: '#2196F3',
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  toggleAuth: {
    alignItems: 'center',
    marginTop: 15,
  },
  toggleAuthText: {
    color: '#2196F3',
  },
});