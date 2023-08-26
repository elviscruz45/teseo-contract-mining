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
  where,
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
import { saveApprovalListnew } from "../../../actions/search";
import { updateAITServicesDATA } from "../../../actions/home";

function HomeScreen(props) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  console.log("1HomeScreen");
  // console.log(props.postPerPage);

  // props.resetPostPerPageHome(5); // PROVING RERENDERING-------------

  // this useEffect is used to retrive all data from firebase
  useEffect(() => {
    let unsubscribe;

    function fetchData() {
      let queryRef = query(
        collection(db, "events"),
        // limit(props.postPerPage),
        limit(10),
        orderBy("createdAt", "desc")
      );

      unsubscribe = onSnapshot(queryRef, (ItemFirebase) => {
        const lista = [];
        ItemFirebase.forEach((doc) => {
          lista.push(doc.data());
        });

        console.log("1.OnSnapshoFETCH_EVENTS", lista);
        setPosts(lista);
        props.saveTotalEventServiceAITList(lista);
      });
      setIsLoading(false);
    }

    fetchData();

    // Cleanup function to unsubscribe from the previous listener
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);
  // }, [props.postPerPage]);

  //

  useEffect(() => {
    let unsubscribe;
    function fetchData() {
      let queryRef = query(
        collection(db, "approvals"),
        orderBy("date", "desc"),
        where("ApprovalRequestSentTo", "array-contains", props.email)
      );

      unsubscribe = onSnapshot(queryRef, (ItemFirebase) => {
        const lista = [];
        ItemFirebase.forEach((doc) => {
          lista.push(doc.data());
        });
        console.log("3.OnsnapshotHeaderAPROVALS", lista);

        // const filteredArray = lista.filter(
        //   (element) =>
        //     !(
        //       element.ApprovalPerformed?.includes(props.email) ||
        //       element.RejectionPerformed?.includes(props.email)
        //     )
        // );

        props.saveApprovalListnew(lista);
      });
    }

    fetchData();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const loadMorePosts = () => {
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
    return <Text selectable={true}>{shortText}</Text>;
  };
  console.log("1.-Screen");

  if (isLoading) {
    console.log("--------loadingHOME SCREEN------");
    return <LoadingSpinner />;
  } else {
    console.log("--------loaded HOME SCREEN------");
    return (
      <FlatList
        data={posts}
        ListHeaderComponent={<HeaderScreen />}
        // scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "white" }} // Add backgroundColor here
        renderItem={({ item, index }) => {
          //the algoritm to retrieve the image source to render the icon
          const area = item.AITAreaServicio;
          const indexareaList = areaLists.findIndex(
            (item) => item.value === area
          );
          const imageSource = areaLists[indexareaList]?.image;
          // return props.servicesData ? (
          return true ? (
            <>
              <View
                style={{
                  // margin: 2,
                  borderBottomWidth: 5,
                  borderBottomColor: "#f0f8ff",
                  paddingVertical: 10,
                }}
              >
                {console.log("1.-FlatListHOMESCREEN")}
                <View style={[styles.row, styles.center]}>
                  <View style={[styles.row, styles.center]}>
                    <TouchableOpacity
                      style={[styles.row, styles.center]}
                      activeOpacity={1}
                    >
                      {item.AITphotoServiceURL ? (
                        <ImageExpo
                          source={{ uri: item.AITphotoServiceURL }}
                          style={styles.roundImage}
                          cachePolicy={"memory-disk"}
                        />
                      ) : (
                        <ImageExpo
                          source={imageSource}
                          style={styles.roundImage}
                          cachePolicy={"memory-disk"}
                        />
                      )}

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
                    <Text style={styles.textAreaComment}>
                      {item.comentarios}
                    </Text>
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
                      <Text>
                        {" "}
                        {item.comentariosUsuarios.length} Comentarios
                      </Text>
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
            </>
          ) : null;
        }}
        keyExtractor={(item) => item.fotoPrincipal} // Provide a unique key for each item
        onEndReached={() => {
          console.log("se re-rerenderiza mucho");
        }}
        // onEndReached={() => loadMorePosts()}
        onEndReachedThreshold={0.1}
      />
    );
  }
}

const mapStateToProps = (reducers) => {
  return {
    email: reducers.profile.email,
    // postPerPage: reducers.home.postPerPage,
    // servicesData: reducers.home.servicesData,
  };
};

export const ConnectedHomeScreen = connect(mapStateToProps, {
  saveTotalEventServiceAITList,
  resetPostPerPageHome,
  saveApprovalListnew,
  updateAITServicesDATA,
})(HomeScreen);
