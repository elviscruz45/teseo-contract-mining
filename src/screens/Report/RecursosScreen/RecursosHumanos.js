import React, { useState } from "react";
import { RecursosProgress } from "./RecursosProgress";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

export const RecursosHumanos = (props) => {
  return (
    <>
      <View style={styles2.container22}>
        <Text
          style={{
            paddingHorizontal: 15,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Disponibiliad Recursos
        </Text>
      </View>

      <Text></Text>
      <RecursosProgress
        cantidad={55}
        titulo={"Reparacion"}
        unidad={"tecnicos"}
      />
      <RecursosProgress
        cantidad={10}
        titulo={"Fabricacion"}
        unidad={"tecnicos"}
      />
      <RecursosProgress
        cantidad={40}
        titulo={"Ingenieria"}
        unidad={"tecnicos"}
      />
      <RecursosProgress
        cantidad={59}
        titulo={"Instalacion"}
        unidad={"tecnicos"}
      />
      <Text
        style={{
          paddingHorizontal: 15,
          fontWeight: "300",
          textAlign: "right",
          fontSize: 12,
        }}
      >
        Ultima Actualizacion: 21 Octubre 2023
      </Text>
    </>
  );
};
const styles2 = StyleSheet.create({
  container22: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
});
