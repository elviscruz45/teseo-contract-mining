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
  Pressable,
  Linking,
} from "react-native";
import { styles } from "./ItemScreen.styles";
import { SearchBar, Icon, Button } from "@rneui/themed";
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
import { screen } from "../../../utils";

const windowWidth = Dimensions.get("window").width;

export function ItemScreen(props) {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [follow, setFollow] = useState(false);

  const {
    route: {
      params: { Item },
    },
  } = props;
  const navigation = useNavigation();

  function chooseImageEquipment(tags) {
    const result = equipmentList.find((item) => {
      return item.tag == tags;
    });
    return result.image;
  }

  useEffect(() => {
    async function fetchData() {
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

  const pressFollow = (item) => {
    setFollow((prev) => !prev);
  };
  const selectAsset = (item) => {
    navigation.navigate(screen.search.tab, {
      screen: screen.search.detail,
      params: { Item: item },
    });
  };

  const polinesDetail = () => {
    navigation.navigate(screen.search.polines, {
      dataReport: Item,
    });
  };

  async function UploadFile(uri) {
    Linking.canOpenURL(uri)
      .then((supported) => {
        if (supported) {
          Linking.openURL(uri);
        } else {
          alert("Unable to open PDF document");
        }
      })
      .catch((error) => alert("Error opening PDF document", error));
  }

  return (
    <>
      <View style={[styles.row, styles.center]}>
        <View>
          <Image
            source={chooseImageEquipment(props.route.params.Item.tag)}
            style={styles.roundImage}
          />
          {follow ? (
            <Pressable style={styles.buttonUnfollow} onPress={pressFollow}>
              <Text style={styles.textFollow}>Follow</Text>
            </Pressable>
          ) : (
            <Pressable style={styles.buttonFollow} onPress={pressFollow}>
              <Text style={styles.textFollow}>Following</Text>
            </Pressable>
          )}
        </View>
        <View>
          <Text></Text>
          <Text style={styles.name}>{Item.tag}</Text>
          <Text style={styles.info}>
            {"Nombre:  "} {Item.nombre}
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
      <Text></Text>
      {Item.clase == "faja" ? (
        <Button
          title="Estado de los Polines"
          buttonStyle={styles.btnActualizarStyles}
          titleStyle={styles.btnTextStyle}
          onPress={polinesDetail}
        />
      ) : null}

      <FlatList
        data={post}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity onPress={() => selectAsset(item)}>
              <View
                style={{
                  borderBottomWidth: 2,
                  borderColor: "#8CBBF1",
                }}
              />
              <View
                style={{
                  borderBottomWidth: 2,
                  borderColor: "#8CBBF1",
                  margin: 2,
                }}
              >
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
                  {item.pdfPrincipal && (
                    <TouchableOpacity
                      onPress={() => UploadFile(item.pdfPrincipal)}
                    >
                      <Icon type="material-community" name="paperclip" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
}
