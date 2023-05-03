import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import { Icon } from "@rneui/themed";
import { styles } from "./HomeScreen.styles";
import { equipmentList } from "../../../utils/equipmentList";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../../utils";
import { saveActualPostFirebase } from "../../../actions/post";
// source={require("../../../../assets/StatisticsGraphic.png")}
// Icono;
const windowWidth = Dimensions.get("window").width;

function HomeScreen(props) {
  const [posts, setPosts] = useState([]);
  const [isScrolledUp, setIsScrolledUp] = useState({ set: "ok" });

  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const post_array = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        post_array.push(doc.data());
      });
      const sortedFirestore = post_array.sort(
        (a, b) => new Date(b.fechaPostISO) - new Date(a.fechaPostISO)
      );
      setPosts(sortedFirestore);
    }
    fetchData();
  }, [isScrolledUp]);

  function handleScroll(event) {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY < -5) {
      setIsScrolledUp({ set: "ok" });
      console.log("aeaaaa");
      console.log(isScrolledUp);
    } else {
      // setIsScrolledUp(false);
      console.log(isScrolledUp);
    }
  }

  function chooseImageEquipment(tags) {
    const result = equipmentList.find((item) => {
      return item.tag == tags;
    });
    console.log("carga de nuevo1");

    return result.image;
  }

  return (
    <>
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
        data={posts}
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

const mapStateToProps = (reducers) => {
  return {
    saveActualPostFirebase: reducers.post.saveActualPostFirebase,
  };
};

export const ConnectedHomeScreen = connect(mapStateToProps, {
  saveActualPostFirebase,
})(HomeScreen);
