import { View, Text } from "react-native";
import React from "react";
import { styles } from "./InfoFormCrusher.styles";
import { Input } from "@rneui/themed";

export function InfoFormCrusher() {
  return (
    <View>
      <Text></Text>
      <View style={styles.content}>
        <Input
          placeholder="Titulo del Evento"
          onChangeText={() => {
            console.log("hola");
          }}
        />
        <Input
          placeholder="Nombre del Componente"
          editable={false}
          onChangeText={() => {
            console.log("hola");
          }}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => console.log("cambiar"),
          }}
        />
        <Input
          placeholder="Supervisor"
          editable={false}
          onChangeText={() => {
            console.log("hola");
          }}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => console.log("cambiar"),
          }}
        />
        <Input
          placeholder="Equipo de Trabajo"
          onChangeText={() => {
            console.log("hola");
          }}
        />
        <Input
          placeholder="Recursos Usados"
          editable={false}
          onChangeText={() => {
            console.log("hola");
          }}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => console.log("cambiar"),
          }}
        />
      </View>
    </View>
  );
}
