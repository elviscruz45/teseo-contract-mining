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
} from "firebase/firestore";
import { db } from "../../../utils";
import { saveActualPostFirebase } from "../../../actions/post";
import { LoadingSpinner } from "../../../components/shared/LoadingSpinner/LoadingSpinner";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { orderBy } from "lodash";

const windowWidth = Dimensions.get("window").width;

function HomeScreen(props) {
  console.log("inicial", posts);
  const [posts, setPosts] = useState([]);
  const [posts2, setPosts2] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  console.log("postsssssssssssss", posts);

  const [isScrolledUp, setIsScrolledUp] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "posts"));
      console.log("useEffect7");
      const q = query(
        collection(db, "posts"),
        where("emailPerfil", "==", "elviscruz45@gmail.com")
      );

      //pruebassss11111111
      console.log("pruebassss11111111");

      const unsubscribe = onSnapshot(q, (querySnapshotFirebase) => {
        const cities = [];
        querySnapshotFirebase.forEach((doc) => {
          cities.push(doc.data());
        });
        console.log("Current cities in CA: ", cities.join(", "));
        setPosts2(cities);
      });
      console.log("pruebassss22222222");

      //pruebasssssss2222222

      const post_array = [];
      querySnapshot.forEach((doc) => {
        post_array.push(doc.data());
      });
      const sortedFirestore = post_array.sort(
        (a, b) => new Date(b.fechaPostISO) - new Date(a.fechaPostISO)
      );
      setPosts(sortedFirestore);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  function handleScroll(event) {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY < -5) {
      setIsScrolledUp(true);
      console.log(isScrolledUp);
    } else {
      setIsScrolledUp(false);
      console.log(isScrolledUp);
    }
  }

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
              <View style={styles.textImage}>
                <Image source={item.image} style={styles.roundImage5} />
                <Text style={styles.Texticons}>{item.tag}</Text>
              </View>
            )}
          />
        </View>
        <Text></Text>
        <FlatList
          data={posts2}
          onScroll={handleScroll}
          scrollEventThrottle={100000000}
          renderItem={({ item }) => (
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: "#E35622",
                margin: 2,
              }}
            >
              <View style={[styles.row, styles.center]}>
                <View style={[styles.row, styles.center]}>
                  <Image
                    source={chooseImageEquipment(item.equipoPostDatos.tag)}
                    style={styles.roundImage}
                  />
                  <Text>{item.equipoPostDatos.tag}</Text>
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
                </View>
              </View>
              <View style={styles.rowlikes}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: windowWidth * 0.45,
                  }}
                >
                  <TouchableOpacity>
                    <Icon type="material-community" name="thumb-up-outline" />
                  </TouchableOpacity>
                  <Text> 15 likes</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity>
                    <Icon
                      type="material-community"
                      name="comment-processing-outline"
                    />
                  </TouchableOpacity>
                  <Text> 15 Comments</Text>
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
