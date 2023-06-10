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
import { size, map } from "lodash";
import { equipmentList } from "../../../utils/equipmentList";
import { screen } from "../../../utils";
import { Image as ImageExpo } from "expo-image";
import { db } from "../../../utils";
import { connect } from "react-redux";
import { EquipmentListUpper } from "../../../actions/home";

const windowWidth = Dimensions.get("window").width;
function SearchScreenNoRedux(props) {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const navigation = useNavigation();
  const [firestoreEquipmentLiked, setFirestoreEquipmentLiked] = useState();

  //This is used to retrieve the equipment we are looking for
  useEffect(() => {
    const result = equipmentList.filter((item) => {
      const re = new RegExp(searchText, "ig");
      return re.test(item.nombre) || re.test(item.tag);
    });
    setSearchResults(result);
  }, [searchText]);

  const selectAsset = (item) => {
    navigation.navigate(screen.search.tab, {
      screen: screen.search.item,
      params: { Item: item },
    });
  };
  //this hook is used to retrieve de list of tags in Firebase EquipmentFavorities and to send to Global state EquipmentListHeader
  useEffect(() => {
    console.log("useeffect Search Screen");
    let unsubscribe; // Variable to store the unsubscribe function

    setSearchResults(equipmentList);
    async function fetchData() {
      const q = query(collection(db, "users"), where("uid", "==", props.uid));

      unsubscribe = onSnapshot(q, (querySnapshotFirebase) => {
        querySnapshotFirebase.forEach((doc) => {
          setFirestoreEquipmentLiked(doc.data().EquipmentFavorities);
          props.EquipmentListUpper(doc.data().EquipmentFavorities);
        });
      });
    }
    console.log("onSnashopt following Search ");

    fetchData();
    return () => {
      // Cleanup function to unsubscribe from the previous listener
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  //Function to sent to Firebase to include/remove the equipment, depending if exist in firestoreEquipmentLiked
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
      <SearchBar
        placeholder="Buscar Equipo"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />

      {/* {!searchResults && <Loading show text="Cargando" />} */}

      <FlatList
        data={searchResults}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity onPress={() => selectAsset(item)}>
              <View style={styles.equipments}>
                <ImageExpo
                  source={item.image}
                  style={styles.image}
                  cachePolicy={"memory-disk"}
                />

                <View>
                  <Text style={styles.name}>{item.tag}</Text>
                  <Text style={styles.info}>{item.nombre}</Text>
                  <Text style={styles.info}>{item.caracteristicas}</Text>
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
        keyExtractor={(item) => item.tag}
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
  };
};

export const SearchScreen = connect(mapStateToProps, { EquipmentListUpper })(
  SearchScreenNoRedux
);
