import React from "react";
import { SafeAreaView, Text, Image, ScrollView } from "react-native";
import { Card } from "@rneui/themed";

const App = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
      }}
    >
      <ScrollView>
        <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center", marginTop: "60" }}>
          Comidas Típicas Salvadoreñas
        </Text>

        <Card containerStyle={{ width: 300, borderRadius: 10 }}>
          <Card.Title>Elotes Locos</Card.Title>
          <Card.Divider />
          <Image
            source={require("./assets/elotes_locos.png")}
            style={{ width: "100%", height: 150, borderRadius: 10 }}
            resizeMode="cover"
          />
          <Text style={{ marginTop: 10, textAlign: "center" }}>
            🔸 Calorías Aproximadas: 📌 250 - 350 kcal por unidad "dependiendo
            de los ingredientes y cantidad".
          </Text>
        </Card>

        <Card containerStyle={{ width: 300, borderRadius: 10 }}>
          <Card.Title>Tamales de Elote</Card.Title>
          <Card.Divider />
          <Image
            source={require("./assets/tamales_elote.jpeg")}
            style={{ width: "100%", height: 150, borderRadius: 10 }}
            resizeMode="cover"
          />
          <Text style={{ marginTop: 10, textAlign: "center" }}>
            🔸 Calorías Aproximadas: 📌 150 - 200 kcal por tamal (dependiendo de
            los ingredientes y tamaño).
          </Text>
        </Card>

        <Card containerStyle={{ width: 300, borderRadius: 10 }}>
          <Card.Title>Pupusas</Card.Title>
          <Card.Divider />
          <Image
            source={require("./assets/pupusas.jpg")}
            style={{ width: "100%", height: 150, borderRadius: 10 }}
            resizeMode="cover"
          />
          <Text style={{ marginTop: 10, textAlign: "center" }}>
            🔸 Calorías Aproximadas: 📌 200 - 350 kcal por pupusa (dependiendo
            del tamaño y los ingredientes).
          </Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
