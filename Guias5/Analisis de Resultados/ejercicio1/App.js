import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  ScrollView,
  Modal,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, Button } from "@rneui/themed";

const App = () => {
  // Estado para manejar qué modal está abierto
  const [modalVisible, setModalVisible] = useState(null);

  // Función para abrir/cerrar un modal específico
  const toggleModal = (id) => {
    setModalVisible(modalVisible === id ? null : id);
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 10 }}>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Lista de Pasa Tiempos
        </Text>

        {/* Primera Card: Musica */}
        <Card containerStyle={{ width: 300, borderRadius: 10 }}>
          <Card.Title>Musica</Card.Title>
          <Card.Divider />
          <Image
            source={require("./assets/musica.jpg")}
            style={{ width: "100%", height: 150, borderRadius: 10 }}
            resizeMode="cover"
          />
          <Button
            title="Ver Información"
            onPress={() => toggleModal("elotes")}
            containerStyle={{ marginTop: 10 }}
          />
        </Card>

        {/* Segunda Card: Pupusas */}
        <Card containerStyle={{ width: 300, borderRadius: 10, marginTop: 20 }}>
          <Card.Title>Pupusas</Card.Title>
          <Card.Divider />
          <Image
            source={require("./assets/pupusas.jpg")}
            style={{ width: "100%", height: 150, borderRadius: 10 }}
            resizeMode="cover"
          />
          <Button
            title="Ver Información"
            onPress={() => toggleModal("pupusas")}
            containerStyle={{ marginTop: 10 }}
          />
        </Card>

        {/* Segunda Card: Pupusas */}
        <Card containerStyle={{ width: 300, borderRadius: 10, marginTop: 20 }}>
          <Card.Title>Pupusas</Card.Title>
          <Card.Divider />
          <Image
            source={require("./assets/pupusas.jpg")}
            style={{ width: "100%", height: 150, borderRadius: 10 }}
            resizeMode="cover"
          />
          <Button
            title="Ver Información"
            onPress={() => toggleModal("pupusas")}
            containerStyle={{ marginTop: 10 }}
          />
        </Card>
        

        {/* MODAL PARA ELOTES LOCOS */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible === "elotes"}
          onRequestClose={() => toggleModal(null)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View
              style={{
                width: 300,
                padding: 20,
                backgroundColor: "white",
                borderRadius: 10,
              }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
              >
                Información de Elotes Locos
              </Text>
              <Text>
                🔸 Calorías Aproximadas: 📌 250 - 350 kcal por unidad.
              </Text>
              <Text style={{ marginTop: 10 }}>
                Un elote cocido con aderezos como mayonesa, queso y salsa de
                tomate.
              </Text>
              <Button
                title="Cerrar"
                onPress={() => toggleModal(null)}
                containerStyle={{ marginTop: 20 }}
              />
            </View>
          </View>
        </Modal>

        {/* MODAL PARA PUPUSAS */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible === "pupusas"}
          onRequestClose={() => toggleModal(null)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View
              style={{
                width: 300,
                padding: 20,
                backgroundColor: "white",
                borderRadius: 10,
              }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
              >
                Información de Pupusas
              </Text>
              <Text>
                🔸 Calorías Aproximadas: 📌 300 - 500 kcal por unidad.
              </Text>
              <Text style={{ marginTop: 10 }}>
                Las pupusas son tortillas rellenas con queso, chicharrón o
                frijoles.
              </Text>
              <Button
                title="Cerrar"
                onPress={() => toggleModal(null)}
                containerStyle={{ marginTop: 20 }}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
