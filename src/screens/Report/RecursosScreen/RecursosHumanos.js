import React, { useState, useEffect } from "react";
import { RecursosProgress } from "./RecursosProgress";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import {
  collection,
  onSnapshot,
  query,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  limit,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../utils";
export const RecursosHumanos = (props) => {
  const [manpower, setManpower] = useState([]);
  // this useEffect is used to retrive all data from firebase
  useEffect(() => {
    let unsubscribe;

    if (props.company) {
      function fetchData() {
        let queryRef = query(
          collection(db, "manpower"),
          where("companyName", "==", props.company.toLowerCase()),
          orderBy("createdAt", "desc"),
          limit(1)
        );

        unsubscribe = onSnapshot(queryRef, (ItemFirebase) => {
          const lista = [];
          ItemFirebase.forEach((doc) => {
            lista.push(doc.data());
          });

          setManpower(lista[0]);
        });
      }
      fetchData();
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [props.company]);

  if (!manpower) {
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
        <Text style={{ alignSelf: "center" }}>No Se ha reportado Todavia</Text>
      </>
    );
  }
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
        cantidad={manpower?.Reparacion}
        total={manpower?.TotalReparacion}
        porcentaje={manpower?.Reparacion / manpower?.TotalReparacion}
        titulo={"Reparacion"}
        unidad={"tecnicos"}
      />
      <RecursosProgress
        cantidad={manpower?.Fabricacion}
        total={manpower?.TotalFabricacion}
        porcentaje={manpower?.Fabricacion / manpower?.TotalFabricacion}
        titulo={"Fabricacion"}
        unidad={"tecnicos"}
      />
      <RecursosProgress
        cantidad={manpower?.Ingenieria}
        total={manpower?.TotalIngenieria}
        porcentaje={manpower?.Ingenieria / manpower?.TotalIngenieria}
        titulo={"Ingenieria"}
        unidad={"tecnicos"}
      />
      <RecursosProgress
        cantidad={manpower?.Maquinado}
        total={manpower?.TotalMaquinado}
        porcentaje={manpower?.Maquinado / manpower?.TotalMaquinado}
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
        Ultima Actualizacion: {manpower?.fechaPostFormato}
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
