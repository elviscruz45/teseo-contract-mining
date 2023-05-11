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
  query,
  startAt,
  endAt,
  limit,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { size, map } from "lodash";
import { equipmentList } from "../../../utils/equipmentList";

const windowWidth = Dimensions.get("window").width;
export function ItemScreen(props) {
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
      </View>
    </View>
  );
}
