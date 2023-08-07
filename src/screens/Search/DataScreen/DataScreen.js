import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { styles } from "./DataScreen.styles";
import { Icon } from "@rneui/themed";
import { db } from "../../../utils";
import {
  collection,
  getDocs,
  doc,
  onSnapshot,
  query,
  where,
  limit,
  startAfter,
  orderBy,
  getDoc,
} from "firebase/firestore";

export function PolinesScreen(props) {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { route, navigation } = props;
  const Item = route.params.dataReport;
  // post.sort((a, b) => new Date(b.createdData) - new Date(a.createdData));
  const completeIdlersList = [];
  post?.forEach((item) => completeIdlersList.push(item.dataList));
  const flattenedArray = completeIdlersList.flat();

  // const uniqueObjects = {};
  // for (const obj of post) {
  //   if (
  //     !uniqueObjects[obj.ID] ||
  //     new Date(obj.createdData) > new Date(uniqueObjects[obj.ID].createdData)
  //   ) {
  //     uniqueObjects[obj.ID] = obj;
  //   }
  // }

  // const uniqueList = Object.values(uniqueObjects);
  // uniqueList.sort((a, b) => a.numeroPolin - b.numeroPolin);

  useEffect(() => {
    async function fetchData() {
      const q = query(
        collection(db, "idlers"),
        where("tagFaja", "==", Item.tag)
      );
      const unsubscribe = onSnapshot(q, (querySnapshotFirebase) => {
        const lista = [];
        querySnapshotFirebase.forEach((doc) => {
          lista.push(doc.data());
        });

        const sortedFirestore = lista.sort(
          (a, b) => new Date(b.createdData) - new Date(a.createdData)
        );
        console.log("910.DataScreen");

        setPost(sortedFirestore);
      });
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <View>
      <View style={styles.radioCard}>
        <View style={styles.containerTypes1}>
          <Text>Numero Polin</Text>
          <Text>Fecha Insp</Text>
          <Text>Prioridad</Text>
          <Text>Cambios</Text>
        </View>
      </View>
      <FlatList
        data={flattenedArray}
        renderItem={({ item, index }) => {
          const fecha = (item) => {
            const date = new Date(item.createdData);
            const monthNamesEn = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ];
            const monthNamesEs = [
              "Enero",
              "Febrero",
              "Marzo",
              "Abril",
              "Mayo",
              "Junio",
              "Julio",
              "Agosto",
              "Septiembre",
              "Octubre",
              "Noviembre",
              "Diciembre",
            ];
            const day = date.getDate();
            const month = date.getMonth();
            const year = date?.getFullYear().toString().slice(-2);
            const formattedDate = `${day}${monthNamesEs[month]}${year}`;
            return formattedDate;
          };

          return (
            <View style={styles.radioCard}>
              <View style={styles.containerTypes1}>
                <Text>
                  .{item.numeroPolin}-{item.posicion}
                </Text>

                <Text>{fecha(item)}</Text>
                <Icon
                  // reverse
                  type="material-community"
                  name="circle"
                  color={
                    item.prioridad === "1_Critico"
                      ? "red"
                      : item.prioridad === "3_Normal"
                      ? "green"
                      : "yellow"
                  }
                  size={18}
                  onPress={() => goToDelete(item)}
                />
                <Text>-</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
