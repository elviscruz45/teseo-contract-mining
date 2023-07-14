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
} from "react-native";
import { styles } from "./SearchScreen.styles";
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
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
  where,
} from "firebase/firestore";
import { screen } from "../../../utils";
import { Image as ImageExpo } from "expo-image";
import { db } from "../../../utils";
import { connect } from "react-redux";
import { EquipmentListUpper } from "../../../actions/home";
import { areaLists } from "../../../utils/areaList";

const windowWidth = Dimensions.get("window").width;
function SearchScreenNoRedux(props) {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const navigation = useNavigation();
  const [firestoreEquipmentLiked, setFirestoreEquipmentLiked] = useState();
  const AITServiceList = props.ActualServiceAITList;
  //This is used to retrieve the equipment we are searching for
  useEffect(() => {
    if (searchText === "") {
      setSearchResults(AITServiceList);
    } else {
      const result = AITServiceList?.filter((item) => {
        const re = new RegExp(searchText, "ig");
        return (
          re.test(item.NombreServicio) ||
          re.test(item.NumeroAIT) ||
          re.test(item.NumeroCotizacion) ||
          re.test(item.TipoServicio)
        );
      });

      setSearchResults(result);
    }
  }, [searchText, props.ActualServiceAITList]);

  //this method is used to go to a screen to see the status of the item
  const selectAsset = (item) => {
    navigation.navigate(screen.search.tab, {
      screen: screen.search.item,
      params: { Item: item },
    });
  };

  //this hook is used to retrieve the list of tags of Firebase of Equipment I am following  to send to Global state EquipmentListHeader
  useEffect(() => {
    console.log("useeffect Search Screen");
    let unsubscribe; // Variable to store the unsubscribe function

    // setSearchResults(equipmentList); this lines of code is remover because dont work
    async function fetchData() {
      const q = query(collection(db, "users"), where("uid", "==", props.uid));

      unsubscribe = onSnapshot(q, (querySnapshotFirebase) => {
        querySnapshotFirebase.forEach((doc) => {
          setFirestoreEquipmentLiked(doc.data().EquipmentFavorities); //when there is un update I update the locas useState to rerender the changes ("seguir" button)
          props.EquipmentListUpper(doc.data().EquipmentFavorities);
        });
      });
    }

    fetchData();
    return () => {
      // Cleanup function to unsubscribe from the previous listener
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  //Function to include/remove from FIrebase (users collection)the "follow" status
  const pressFollow = async (item) => {
    const PostRef = doc(db, "users", props.uid);

    if (firestoreEquipmentLiked?.includes(item.tag)) {
      await updateDoc(PostRef, {
        EquipmentFavorities: arrayRemove(item.tag),
      });
    } else {
      await updateDoc(PostRef, {
        EquipmentFavorities: arrayUnion(item.tag),
      });
    }
  };

  return (
    <>
      {console.log("priemra parte")}
      <SearchBar
        placeholder="Buscar Equipo"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />

      {/* {!searchResults && <Loading show text="Cargando" />} */}
      {console.log("segunda parte")}

      <FlatList
        data={searchResults}
        renderItem={({ item, index }) => {
          //the algoritm to retrieve the image source to render the icon

          const area = item.AreaServicio;
          const indexareaList = areaLists.findIndex(
            (item) => item.value === area
          );
          const imageSource = areaLists[indexareaList]?.image;
          // the algorithm to retrieve the amount with format
          const formattedAmount = new Intl.NumberFormat("en-US", {
            style: "decimal",
            useGrouping: true,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(item.Monto);

          return (
            <TouchableOpacity onPress={() => selectAsset(item)}>
              <View style={styles.equipments}>
                <ImageExpo
                  source={imageSource}
                  style={styles.image}
                  cachePolicy={"memory-disk"}
                />

                <View>
                  <Text style={styles.name}>{item.NombreServicio}</Text>
                  <Text style={styles.info}>
                    {"AIT: "}
                    {item.NumeroAIT}
                  </Text>
                  <Text style={styles.info}>
                    {"Tipo: "}
                    {item.TipoServicio}
                  </Text>
                  <Text style={styles.info}>
                    {"Monto: "}
                    {formattedAmount} {item.Moneda}
                  </Text>
                  <Text style={styles.info}>
                    {"Fecha: "}
                    {item.fechaPostFormato}
                  </Text>
                </View>
                {firestoreEquipmentLiked?.includes(item.tag) ? (
                  <Pressable
                    style={styles.buttonFollow}
                    onPress={() => pressFollow(item)}
                  >
                    <Text style={styles.textFollow}>Siguiendo</Text>
                  </Pressable>
                ) : (
                  <Pressable
                    style={styles.buttonUnfollow}
                    onPress={() => pressFollow(item)}
                  >
                    <Text style={styles.textFollow}>Seguir</Text>
                  </Pressable>
                )}
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.NumeroAIT}
      />
    </>
  );
}

const mapStateToProps = (reducers) => {
  return {
    ActualPostFirebase: reducers.post.ActualPostFirebase,
    firebase_user_name: reducers.profile.firebase_user_name,
    user_photo: reducers.profile.user_photo,
    email: reducers.profile.email,
    profile: reducers.profile.profile,
    uid: reducers.profile.uid,

    ActualServiceAITList: reducers.post.ActualServiceAITList,
  };
};

export const SearchScreen = connect(mapStateToProps, { EquipmentListUpper })(
  SearchScreenNoRedux
);
