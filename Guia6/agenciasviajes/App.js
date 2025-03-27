import React, { useState } from "react";
import { View, StyleSheet, Image, Text, ScrollView, Modal, Button, TouchableHighlight } from "react-native";

const App = () => {
  const [modalVisibleplaya, setModalVisibleplaya] = useState(false);
  const [modalVisiblePupusas, setModalVisiblePupusas] = useState(false);
  const [modalVisibleAcampar, setModalVisibleAcampar] = useState(false);
  return (
    <>
      <Modal transparent={true} animationType="slide" visible={modalVisibleplaya} onRequestClose={() => {alert('Modal has been closed')}}>
        <View style={styles.vistaModal}>
          <View style={styles.Modal}>
            <Text style={styles.subtitulo}>Ir a la Playa</Text>
            <Text>El Salvador cuenta con hermosas playas a nivel Centroamérica.</Text>
            <Button title="Cerrar" onPress={() => setModalVisibleplaya(!modalVisibleplaya)} />
          </View>
        </View>
      </Modal>
      
      <Modal transparent={true} animationType="slide" visible={modalVisiblePupusas} onRequestClose={() => {alert('Modal has been closed')}}>
        <View style={styles.vistaModal}>
          <View style={styles.Modal}>
            <Text style={styles.subtitulo}>Pupusas</Text>
            <Text>El Salvador cuenta con un delicioso plato tipico llamado: Pupusas.</Text>
            <Button title="Cerrar" onPress={() => setModalVisiblePupusas(!modalVisiblePupusas)} />
          </View>
        </View>
      </Modal>

      <Modal transparent={true} animationType="slide" visible={modalVisibleAcampar} onRequestClose={() => {alert('Modal has been closed')}}>
        <View style={styles.vistaModal}>
          <View style={styles.Modal}>
            <Text style={styles.subtitulo}>A campar</Text>
            <Text>El Salvador cuenta con lindos lugares para Acampar</Text>
            <Button title="Cerrar" onPress={() => setModalVisibleAcampar(!modalVisibleAcampar)} />
          </View>
        </View>
      </Modal>

      <View>
        <View style={{ flexDirection: "row" }}>
          <Image style={styles.banner} source={require("./assets/img/bg.jpg")} />
        </View>

        <View style={styles.contenedor}>
          <Text style={styles.titulo}>Que hacer en El Salvador</Text>
          <ScrollView horizontal>
            <View>
              <TouchableHighlight onPress={()=>{setModalVisibleplaya(!modalVisibleplaya)}}
              >
              <Image style={styles.ciudad} source={require('./assets/img/actividad1.jpg')} />
              </TouchableHighlight>
            </View>
            
            <View>
              <Image style={styles.ciudad} source={require('./assets/img/actividad2.jpg')} />
            </View>
            <View>
            <TouchableHighlight onPress={()=>{setModalVisibleAcampar(!modalVisibleAcampar)}}
              >
              <Image style={styles.ciudad} source={require('./assets/img/actividad3.jpg')} />
              </TouchableHighlight>
            </View>
            <View>
              <Image style={styles.ciudad} source={require('./assets/img/actividad4.jpg')} />
            </View>
            <View>
              <Image style={styles.ciudad} source={require('./assets/img/actividad5.jpg')} />
            </View>
          </ScrollView>
        </View>
      </View>

      <ScrollView>
        <Text style={styles.titulo}>Platillos Típicos</Text>
        <TouchableHighlight onPress={()=>{setModalVisiblePupusas(!modalVisiblePupusas)}}
              >
        <Image style={styles.mejores} source={require('./assets/img/mejores1.jpg')} />
        </TouchableHighlight>
        <Image style={styles.mejores} source={require('./assets/img/mejores2.jpg')} />
        <Image style={styles.mejores} source={require('./assets/img/mejores3.jpg')} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  banner: {
    height: 250,
    flex: 1,
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 24,
    marginVertical: 10,
  },
  contenedor: {
    marginHorizontal: 10,
  },
  ciudad: {
    width: 250,
    height: 300,
    marginRight: 10,
  },
  mejores: {
    width: '100%',
    height: 200,
    marginVertical: 5,
  },
  vistaModal: {
    backgroundColor:'#000000aa',
    flex: 1,
  },
  Modal: {
    backgroundColor: '#fff',
    margin: 50,
    padding: 40,
    borderRadius: 10,
    flex: 1,
  },
  subtitulo: {
    fontWeight: 'bold',
    fontSize: 14,
    justifyContent: 'center',
  },
});

export default App;
