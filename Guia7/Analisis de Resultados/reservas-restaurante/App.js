import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableHighlight, 
  TouchableWithoutFeedback, 
  Keyboard,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Reserva from './components/Reserva';
import FormularioReserva from './components/FormularioReserva';
import colors from './src/utils/colors';

const App = () => {
  const [reservas, setReservas] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);

  useEffect(() => {
    const obtenerReservasStorage = async () => {
      try {
        const reservasStorage = await AsyncStorage.getItem('reservas');
        if(reservasStorage) {
          setReservas(JSON.parse(reservasStorage));
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerReservasStorage();
  }, []);

  const eliminarReserva = id => {
    const reservasFiltradas = reservas.filter(reserva => reserva.id !== id);
    setReservas(reservasFiltradas);
    guardarReservasStorage(JSON.stringify(reservasFiltradas));
  };

  const guardarReservasStorage = async (reservasJSON) => {
    try {
      await AsyncStorage.setItem('reservas', reservasJSON);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Administrador de Reservas</Text>
        
        <TouchableHighlight 
          onPress={() => setMostrarForm(!mostrarForm)} 
          style={styles.btnMostrarForm}
        >
          <Text style={styles.textoMostrarForm}>
            {mostrarForm ? 'Ver Reservas' : 'Nueva Reserva'}
          </Text>
        </TouchableHighlight>

        <View style={styles.contenido}>
          {mostrarForm ? (
            <>
              <Text style={styles.subtitulo}>Nueva Reserva</Text>
              <FormularioReserva
                reservas={reservas}
                setReservas={setReservas}
                guardarMostrarForm={setMostrarForm}
                guardarReservasStorage={guardarReservasStorage}
              />
            </>
          ) : (
            <>
              <Text style={styles.subtitulo}>
                {reservas.length > 0 ? 'Tus Reservas' : 'No hay reservas registradas'}
              </Text>
              <FlatList
                data={reservas}
                renderItem={({item}) => (
                  <Reserva 
                    item={item} 
                    eliminarReserva={eliminarReserva} 
                  />
                )}
                keyExtractor={reserva => reserva.id}
              />
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: colors.PRIMARY_COLOR,
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 40 : 20
  },
  titulo: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  subtitulo: {
    color: '#FFF',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%',
    marginBottom: 20
  },
  btnMostrarForm: {
    padding: 10,
    backgroundColor: colors.BUTTON_COLOR,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 5
  },
  textoMostrarForm: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16
  }
});

export default App;