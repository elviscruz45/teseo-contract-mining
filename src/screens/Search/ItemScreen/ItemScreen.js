import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Image,
} from "react-native";
import { styles } from "./ItemScreen.styles";
import { SearchBar, Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
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
import { size, map } from "lodash";
import { equipmentList } from "../../../utils/equipmentList";
import { db } from "../../../utils";

const windowWidth = Dimensions.get("window").width;

export function ItemScreen(props) {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    route: {
      params: { Item },
    },
  } = props;
  const navigation = useNavigation();
  console.log(props.route.params.Item);

  function chooseImageEquipment(tags) {
    const result = equipmentList.find((item) => {
      return item.tag == tags;
    });
    return result.image;
  }

  useEffect(() => {
    async function fetchData() {
      console.log("useofuseEffect");
      const q = query(
        collection(db, "posts"),
        where("equipoTag", "==", Item.tag)
      );
      const unsubscribe = onSnapshot(q, (querySnapshotFirebase) => {
        const lista = [];
        querySnapshotFirebase.forEach((doc) => {
          lista.push(doc.data());
        });

        const sortedFirestore = lista.sort(
          (a, b) => new Date(b.fechaPostISO) - new Date(a.fechaPostISO)
        );

        setPost(sortedFirestore);
      });
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <View style={styles.item}>
      <Image
        source={chooseImageEquipment(props.route.params.Item.tag)}
        style={styles.image}
      />
      <View>
        <Text></Text>
        <Text style={styles.name}>{Item.tag}</Text>
        <Text style={styles.info}>
          {"Nombre:  "} {Item.nombre}
        </Text>
        <Text style={styles.info}>
          {"Clase:  "} {Item.clase}
        </Text>
        <Text style={styles.info}>
          {"Marca:  "} {Item.marca}
        </Text>
        <Text style={styles.info}>
          {"Tonelaje:  "} {Item.tonelaje}
        </Text>
        <Text style={styles.info}>
          {"Tamano:  "} {Item.tamano}
        </Text>

        <Text style={styles.info}>
          {"Caracteristica:  "} {Item.caracteristicas}
        </Text>
        <Text style={styles.info}>
          {"Datos Adicionales:  "} {Item.datos_adicionales}
        </Text>
        <FlatList
          data={post}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity onPress={() => selectAsset(item)}>
                <View style={styles.equipments2}>
                  <Image
                    source={{ uri: item.fotoPrincipal }}
                    style={styles.image2}
                  />
                  <View>
                    <Text style={styles.name2}>{item.titulo}</Text>
                    <Text style={styles.info2}>{item.comentarios}</Text>
                    <Text style={styles.info2}>{item.fechaPostFormato}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
}
