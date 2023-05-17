import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Linking,
} from "react-native";
import { connect } from "react-redux";
import { Icon } from "@rneui/themed";
import { styles } from "./HomeScreen.styles";
import { equipmentList } from "../../../utils/equipmentList";
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
import { db } from "../../../utils";
import { saveActualPostFirebase } from "../../../actions/post";
import { LoadingSpinner } from "../../../components/shared/LoadingSpinner/LoadingSpinner";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { screen } from "../../../utils";
// import { orderBy } from "lodash";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;

function HomeScreen(props) {
  const [posts2, setPosts2] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  // const [lastDocSnapshot, setLastDocSnapshot] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchData() {
      console.log("useofuseEffect");
      // Try to retrieve data from AsyncStorage
      const q = query(
        collection(db, "posts")
        // limit(5),
        // startAfter(lastDocSnapshot.get("fechaPostISO")),
        // orderBy("fechaPostISO", "desc")
        // where("emailPerfil", "==", "elviscruz45@gmail.com")
      );
      const unsubscribe = onSnapshot(q, (querySnapshotFirebase) => {
        const lista = [];
        querySnapshotFirebase.forEach((doc) => {
          lista.push(doc.data());
        });

        const sortedFirestore = lista.sort(
          (a, b) => new Date(b.fechaPostISO) - new Date(a.fechaPostISO)
        );

        setPosts2(sortedFirestore);
      });
      setIsLoading(false);
    }
    fetchData();
  }, []);

  function chooseImageEquipment(tags) {
    const result = equipmentList.find((item) => {
      return item.tag == tags;
    });

    return result.image;
  }

  async function UploadFile(uri) {
    Linking.canOpenURL(uri)
      .then((supported) => {
        if (supported) {
          Linking.openURL(uri);
        } else {
          console.log("Unable to open PDF document");
        }
      })
      .catch((error) => console.log("Error opening PDF document", error));
  }

  const selectAsset = (item) => {
    console.log(item);
    navigation.navigate(screen.search.tab, {
      screen: screen.search.item,
      params: { Item: item },
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  } else {
    return (
      <>
        {console.log("carga1")}
        <Text></Text>
        <View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={equipmentList}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => selectAsset(item)}>
                <View style={styles.textImage}>
                  <Image source={item.image} style={styles.roundImage5} />
                  <Text style={styles.Texticons}>{item.tag}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <Text></Text>
        <FlatList
          data={posts2}
          scrollEventThrottle={100000000}
          renderItem={({ item }) => (
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: "#8CBBF1",
                margin: 2,
              }}
            >
              <View style={[styles.row, styles.center]}>
                <View style={[styles.row, styles.center]}>
                  <TouchableOpacity
                    onPress={() => selectAsset(item.equipoPostDatos)}
                    style={[styles.row, styles.center]}
                  >
                    <Image
                      source={chooseImageEquipment(item.equipoPostDatos.tag)}
                      style={styles.roundImage}
                    />
                    <Text>{item.equipoPostDatos.tag}</Text>
                  </TouchableOpacity>

                  <Image
                    source={{ uri: item.fotoUsuarioPerfil }}
                    style={styles.roundImage}
                  />
                  <Text>{item.nombrePerfil}</Text>
                </View>
              </View>
              <View style={[styles.row, styles.center]}>
                <Text style={{ margin: 5, color: "#5B5B5B" }}>
                  {"Fecha:  "}
                  {item.fechaPostFormato}
                </Text>
                {item.pdfPrincipal && (
                  <TouchableOpacity
                    onPress={() => UploadFile(item.pdfPrincipal)}
                  >
                    <Icon type="material-community" name="paperclip" />
                    <Text>Archivo Adjunto</Text>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.equipments}>
                <Image
                  source={{ uri: item.fotoPrincipal }}
                  style={styles.postPhoto}
                />
                <View>
                  <Text style={styles.textAreaTitle}>{item.titulo}</Text>
                  <Text style={styles.textAreaComment}>{item.comentarios}</Text>
                  <Text style={styles.textAreaTitle}>Datos Adicionales: </Text>
                  <Text style={styles.textAreaComment}>
                    {"Componente:"}
                    {item.nombreComponente}
                    {", Supervisor:"}
                    {item.supervisor}
                    {", Equipo de Trabajo:"}
                    {item.equipoTrabajo}
                    {", Recursos:"}
                    {item.recursos}
                  </Text>
                </View>
              </View>
              <View style={styles.rowlikes}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: windowWidth * 0.35,
                  }}
                >
                  <TouchableOpacity>
                    <Icon type="material-community" name="thumb-up-outline" />
                  </TouchableOpacity>
                  <Text> 15 Me gusta</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity>
                    <Icon
                      type="material-community"
                      name="comment-processing-outline"
                    />
                  </TouchableOpacity>
                  <Text> 15 Comentarios</Text>
                </View>
              </View>
            </View>
          )}
        />
      </>
    );
  }
}

const mapStateToProps = (reducers) => {
  return {
    ActualPostFirebase: reducers.post.ActualPostFirebase,
  };
};

export const ConnectedHomeScreen = connect(mapStateToProps, {
  saveActualPostFirebase,
})(HomeScreen);
