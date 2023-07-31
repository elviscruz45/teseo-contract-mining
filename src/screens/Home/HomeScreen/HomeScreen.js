import React, { useEffect, useState, useCallback } from "react";
import { Text, View, FlatList, TouchableOpacity, Linking } from "react-native";
import { connect } from "react-redux";
import { Icon } from "@rneui/themed";
import { styles } from "./HomeScreen.styles";
import { equipmentList } from "../../../utils/equipmentList";
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
import { LoadingSpinner } from "../../../components/shared/LoadingSpinner/LoadingSpinner";
import { screen } from "../../../utils";
import { useNavigation } from "@react-navigation/native";
import { Image as ImageExpo } from "expo-image";
import { HeaderScreen } from "../../../components/Home";
import { saveTotalEventServiceAITList } from "../../../actions/home";
import { areaLists } from "../../../utils/areaList";
import { resetPostPerPageHome } from "../../../actions/home";

function HomeScreen(props) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  console.log("1HomeScreen");

  console.log(props.postPerPage);

  // props.resetPostPerPageHome(5); // PROVING RERENDERING-------------

  // this useEffect is used to retrive all data from firebase
  useEffect(() => {
    // console.log("useeffectHomeScreen");
    let unsubscribe;

    async function fetchData() {
      let queryRef = query(
        collection(db, "events"),
        limit(props.postPerPage),
        orderBy("createdAt", "desc")
      );

      unsubscribe = onSnapshot(queryRef, (ItemFirebase) => {
        const lista = [];
        ItemFirebase.forEach((doc) => {
          lista.push(doc.data());
        });

        console.log("1OnSnapshopHomeHomeScreen");

        setPosts(lista);
        props.saveTotalEventServiceAITList(lista);
      });
      setIsLoading(false);
    }

    fetchData();

    return () => {
      // Cleanup function to unsubscribe from the previous listener
      if (unsubscribe) {
        unsubscribe();
      }
    };
    // }, []);
  }, [props.postPerPage]);

  //This function is designed to retrieve more posts when they reach the final view, as lazy loading

  const loadMorePosts = async () => {
    console.log("props.resetPostPerPageHome(props.postPerPage)");
    props.resetPostPerPageHome(props.postPerPage);
  };

  //This function retrieve the image file to render equipments from the header horizontal bar
  const chooseImageEquipment = useCallback((tags) => {
    const result = equipmentList.find((item) => {
      return item.tag === tags;
    });
    return result?.image;
  }, []);

  //---This is used to get the attached file in the post that contain an attached file---
  const uploadFile = useCallback(async (uri) => {
    // console.log("pdfHomescreen", uri);
    try {
      const supported = await Linking.canOpenURL(uri);
      if (supported) {
        await Linking.openURL(uri);
      } else {
        alert("Unable to open PDF document");
      }
    } catch (error) {
      alert("Error opening PDF document", error);
    }
  }, []);

  //----this goes to another screen using the params given in this screen, useCallBack---
  const selectAsset = useCallback(
    (item) => {
      navigation.navigate(screen.search.tab, {
        screen: screen.search.item,
        params: { Item: item },
      });
    },
    [navigation]
  );

  //---activate like/unlike Post using useCallback--------
  const likePost = useCallback(
    async (item) => {
      const postRef = doc(db, "events", item.idDocFirestoreDB);

      if (item.likes.includes(props.email)) {
        await updateDoc(postRef, {
          likes: arrayRemove(props.email),
        });
      } else {
        await updateDoc(postRef, {
          likes: arrayUnion(props.email),
        });
      }
    },
    [props.email]
  );

  //--To goes to comment screen using callBack-----
  const commentPost = useCallback(
    (item) => {
      navigation.navigate(screen.home.tab, {
        screen: screen.home.comment,
        params: { Item: item },
      });
    },
    [navigation]
  );

  // create an algorithm to reduce the total text of the service description
  const ShortTextComponent = (item) => {
    const longText = item || "";
    const maxLength = 25; // Maximum length of the short text
    let shortText = longText;
    if (longText.length > maxLength) {
      shortText = `${longText.substring(0, maxLength)}...`;
    }
    return <Text>{shortText}</Text>;
  };

  if (isLoading) {
    return <LoadingSpinner />;
  } else {
    return (
      <FlatList
        data={posts}
        ListHeaderComponent={<HeaderScreen />}
        // scrollEnabled={false}
        style={{ backgroundColor: "white" }} // Add backgroundColor here
        renderItem={({ item, index }) => {
          //the algoritm to retrieve the image source to render the icon
          const area = item.AITAreaServicio;
          const indexareaList = areaLists.findIndex(
            (item) => item.value === area
          );
          const imageSource = areaLists[indexareaList]?.image;
          return (
            <View
              style={{
                // margin: 2,
                borderBottomWidth: 5,
                borderBottomColor: "#f0f8ff",
              }}
            >
              <View style={[styles.row, styles.center]}>
                <View style={[styles.row, styles.center]}>
                  <TouchableOpacity
                    // onPress={() => selectAsset(item.equipoPostDatos)}
                    style={[styles.row, styles.center]}
                  >
                    <ImageExpo
                      source={imageSource}
                      style={styles.roundImage}
                      cachePolicy={"memory-disk"}
                    />
                    {/* <Text>{item.equipoPostDatos?.tag}</Text> */}
                    {ShortTextComponent(item.AITNombreServicio)}
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
                <Text style={{ marginLeft: 5, color: "#5B5B5B" }}>
                  {"Fecha:  "}
                  {item.fechaPostFormato}
                </Text>
              </View>
              <View style={styles.equipments}>
                <TouchableOpacity onPress={() => commentPost(item)}>
                  <ImageExpo
                    source={{ uri: item.fotoPrincipal }}
                    style={styles.postPhoto}
                    cachePolicy={"memory-disk"}
                  />
                </TouchableOpacity>

                <View>
                  <Text style={styles.textAreaTitle}>
                    {/* {"Evento: "} */}
                    {item.titulo}
                  </Text>
                  <Text style={styles.textAreaComment}>{item.comentarios}</Text>
                </View>
              </View>
              <View style={styles.rowlikes}>
                <View style={styles.likeComment}>
                  <TouchableOpacity
                    onPress={() => likePost(item)}
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <Icon
                      type="material-community"
                      name={
                        item.likes.includes(props.email)
                          ? "thumb-up"
                          : "thumb-up-outline"
                      }
                    />

                    <Text> {item.likes.length} Revisado</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.likeComment}>
                  <TouchableOpacity
                    onPress={() => commentPost(item)}
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <Icon
                      type="material-community"
                      name="comment-processing-outline"
                    />

                    <Text> {item.comentariosUsuarios.length} Comentarios</Text>
                  </TouchableOpacity>
                </View>
                {item.pdfPrincipal && (
                  <TouchableOpacity
                    onPress={() => uploadFile(item.pdfPrincipal)}
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <Icon type="material-community" name="paperclip" />
                    <Text>Pdf File</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.fotoPrincipal} // Provide a unique key for each item
        // onEndReached={() => console.log("se re-rerenderiza mucho")}
        onEndReached={() => loadMorePosts()}
        onEndReachedThreshold={0.1}
      />
    );
  }
}

const mapStateToProps = (reducers) => {
  return {
    email: reducers.profile.email,
    totalEventServiceAITLIST: reducers.home.totalEventServiceAITLIST,
    postPerPage: reducers.home.postPerPage,
  };
};

export const ConnectedHomeScreen = connect(mapStateToProps, {
  saveTotalEventServiceAITList,
  resetPostPerPageHome,
})(HomeScreen);
