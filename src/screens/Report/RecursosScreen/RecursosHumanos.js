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
  orderBy,
} from "firebase/firestore";
import { db } from "../../../utils";
export const RecursosHumanos = (props) => {
  const [manpower, setManpower] = useState([]);
  const [company, setCompany] = useState("prodise");

  // this useEffect is used to retrive all data from firebase
  useEffect(() => {
    // console.log("useeffectHomeScreen");
    let unsubscribe;

    async function fetchData() {
      let queryRef = query(
        collection(db, "manpower"),
        where("companyName", "==", company),
        orderBy("createdAt", "desc"),
        limit(1)
      );

      unsubscribe = onSnapshot(queryRef, (ItemFirebase) => {
        const lista = [];
        ItemFirebase.forEach((doc) => {
          lista.push(doc.data());
        });

        console.log("55.OnSnapshopManpower");

        setManpower(lista[0]);
      });
    }

    fetchData();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

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
        porcentaje={manpower?.Reparacion / manpower?.TotalReparacion}
        titulo={"Reparacion"}
        unidad={"tecnicos"}
      />
      <RecursosProgress
        cantidad={manpower?.Reparacion}
        porcentaje={manpower?.Reparacion / manpower?.TotalReparacion}
        titulo={"Fabricacion"}
        unidad={"tecnicos"}
      />
      <RecursosProgress
        cantidad={manpower?.Reparacion}
        porcentaje={manpower?.Reparacion / manpower?.TotalReparacion}
        titulo={"Ingenieria"}
        unidad={"tecnicos"}
      />
      <RecursosProgress
        cantidad={manpower?.Reparacion}
        porcentaje={manpower?.Reparacion / manpower?.TotalReparacion}
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
        Ultima Actualizacion: 21 Octubre 2023 {manpower?.formattedDate}
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
