import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  Linking,
} from "react-native";
import { connect } from "react-redux";
import { Icon } from "@rneui/themed";
import { styles } from "./HomeScreen.styles";
import { equipmentList } from "../../../utils/equipmentList";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../utils";
import { saveActualPostFirebase } from "../../../actions/post";
import { LoadingSpinner } from "../../../components/shared/LoadingSpinner/LoadingSpinner";
import { screen } from "../../../utils";
import { useNavigation } from "@react-navigation/native";
import { Image as ImageExpo } from "expo-image";

const windowWidth = Dimensions.get("window").width;

function HomeScreen(props) {
  const [posts2, setPosts2] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchData() {
      // Try to retrieve data from AsyncStorage
      const q = query(collection(db, "posts"));
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
          alert("Unable to open PDF document");
        }
      })
      .catch((error) => alert("Error opening PDF document", error));
  }

  const selectAsset = (item) => {
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
        <Text></Text>
        <View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={equipmentList}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => selectAsset(item)}>
                <View style={styles.textImage}>
                  <ImageExpo
                    source={item.image}
                    style={styles.roundImage5}
                    cachePolicy={"memory-disk"}
                  />
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
                    <ImageExpo
                      source={chooseImageEquipment(item.equipoPostDatos?.tag)}
                      style={styles.roundImage}
                      cachePolicy={"memory-disk"}
                    />
                    <Text>{item.equipoPostDatos?.tag}</Text>
                  </TouchableOpacity>

                  <ImageExpo
                    source={{ uri: item.fotoUsuarioPerfil }}
                    style={styles.roundImage}
                    cachePolicy={"memory-disk"}
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
                <ImageExpo
                  source={{ uri: item.fotoPrincipal }}
                  style={styles.postPhoto}
                  cachePolicy={"memory-disk"}
                />
                <View>
                  <Text style={styles.textAreaTitle}>{item.titulo}</Text>
                  <Text style={styles.textAreaComment}>{item.comentarios}</Text>
                  <Text style={styles.textAreaTitleplus}>
                    Datos Adicionales:{" "}
                  </Text>
                  <Text style={styles.textAreaCommentplus}>
                    {"Etapa del evento:"}
                    {item.etapa}
                  </Text>
                  <Text style={styles.textAreaCommentplus}>
                    {"Componente:"}
                    {item.nombreComponente}
                  </Text>
                  <Text style={styles.textAreaCommentplus}>
                    {"Datos Clave:"}
                    {item.tipo}
                  </Text>

                  <Text style={styles.textAreaCommentplus}>
                    {"Recursos:"}
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
                  <Text> 0 Me gusta</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity>
                    <Icon
                      type="material-community"
                      name="comment-processing-outline"
                    />
                  </TouchableOpacity>
                  <Text> 0 Comentarios</Text>
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
