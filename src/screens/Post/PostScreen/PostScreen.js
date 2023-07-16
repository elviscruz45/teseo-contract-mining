import {
  View,
  Text,
  Modal,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Icon, Avatar, SearchBar } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { saveActualEquipment } from "../../../actions/post";
import { styles } from "./PostScreen.styles";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import * as ImagePicker from "expo-image-picker";
import { savePhotoUri } from "../../../actions/post";
import * as ImageManipulator from "expo-image-manipulator";
import { db } from "../../../utils";
import {
  collection,
  onSnapshot,
  query,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  where,
  limit,
  orderBy,
} from "firebase/firestore";
import { areaLists } from "../../../utils/areaList";
import { saveActualAITServicesFirebaseGlobalState } from "../../../actions/post";
function PostScreen(props) {
  const POSTS_PER_PAGE = 20; // Number of posts to retrieve per page from Firebase

  const emptyimage = require("../../../../assets/splash.png");
  const [photos, setPhotos] = useState([]);
  const navigation = useNavigation();
  const [equipment, setEquipment] = useState(null);
  const [AIT, setAIT] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [lengPosts, setlengPosts] = useState(POSTS_PER_PAGE);
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState(null);

  //retrieving serviceAIT list data from firebase
  useEffect(() => {
    console.log("useeffectAIT");
    let unsubscribe; // Variable to store the unsubscribe function

    async function fetchData() {
      queryRef = query(
        collection(db, "ServiciosAIT"),
        limit(lengPosts),
        orderBy("createdAt", "desc")
      );

      unsubscribe = onSnapshot(queryRef, (ItemFirebase) => {
        const lista = [];
        ItemFirebase.forEach((doc) => {
          lista.push(doc.data());
        });
        console.log("OnSnapshopPublicar Service AIT");
        setPosts(lista);
        props.saveActualAITServicesFirebaseGlobalState(lista); // to global state
      });
      // setIsLoading(false);
    }
    fetchData();
    return () => {
      // Cleanup function to unsubscribe from the previous listener
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  //This is used to retrieve the equipment we are looking for

  useEffect(() => {
    if (searchText === "") {
      setSearchResults(posts);
    } else {
      const result = posts.filter((item) => {
        const re = new RegExp(searchText, "ig");
        return re.test(item.NumeroAIT) || re.test(item.NombreServicio);
      });
      setSearchResults(result);
    }
  }, [searchText, posts]);

  //method to retrieve the picture required in the event post (pick Imagen, take a photo)
  const pickImage = async () => {
    if (!equipment) return;
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    const resizedPhoto = await ImageManipulator.manipulateAsync(
      result.assets[0].uri,
      [{ resize: { width: 800 } }],
      { compress: 0.1, format: "jpeg", base64: true }
    );
    props.savePhotoUri(resizedPhoto.uri);
    navigation.navigate(screen.post.form);

    if (!result.canceled) {
      console.log("Upload Image");
    }
    setEquipment(null);
  };
  // go to another screen to take a photo before put data to the form
  const camera = () => {
    if (!equipment) return;
    navigation.navigate(screen.post.camera);
    setEquipment(null);
    setAIT(null);
  };

  //Addin a new Service asigned called AIT

  const addAIT = () => {
    navigation.navigate(screen.post.aitform);
    setEquipment(null);
    setAIT(null);
  };

  const selectAsset = (AIT) => {
    const area = AIT.AreaServicio;
    console.log("area", area);
    const indexareaList = areaLists.findIndex((item) => item.value === area);
    const imageSource = areaLists[indexareaList]?.image;
    setAIT(AIT);
    setEquipment(imageSource);
    props.saveActualEquipment(AIT);
  };

  //This function is designed to retrieve more Services AIT when they reach the final view, as lazy loading

  const loadMorePosts = async () => {
    console.log("snapshotGETDOCS");
    setlengPosts((prevPosts) => prevPosts + POSTS_PER_PAGE);
  };

  return (
    <>
      <SearchBar
        placeholder="Buscar AIT o nombre del servicio"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <View style={styles.equipments}>
        <View>
          <Avatar
            size="large"
            rounded
            containerStyle={styles.avatar}
            icon={{ type: "material", name: "person" }}
            source={{ uri: props.user_photo }}
          ></Avatar>
          <View>
            <Text style={styles.name}>
              {props.firebase_user_name || "Anónimo"}
            </Text>
            <Text style={styles.info}>{props.email}</Text>
          </View>
        </View>
        <View>
          <Icon
            // reverse
            type="material-community"
            name="arrow-right-bold"
            color="#384967"
            size={25}
            containerStyle={styles.btnContainer1}
            // onPress={() => goToEdit(item, index)}
          />
        </View>

        <View>
          <Avatar
            size="large"
            rounded
            containerStyle={styles.avatar}
            icon={{ type: "material", name: "person" }}
            source={equipment || emptyimage}
          ></Avatar>
          <View>
            <Text style={styles.name}>{AIT?.TipoServicio || "Escoge AIT"}</Text>
            <Text style={styles.info}>{AIT?.NumeroAIT || "de la lista"}</Text>
          </View>
        </View>
      </View>
      <FlatList
        data={searchResults}
        renderItem={({ item, index }) => {
          const area = item.AreaServicio;
          const indexareaList = areaLists.findIndex(
            (item) => item.value === area
          );
          const imageSource = areaLists[indexareaList]?.image;

          return (
            <TouchableOpacity onPress={() => selectAsset(item)}>
              <View style={styles.equipments}>
                <Image source={imageSource} style={styles.image} />
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
                    {"Fecha Inicio: "}
                    {item.fechaPostFormato}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.NumeroAIT} // Provide a unique key for each item
        // onEndReached={() => loadMorePosts()}
        // onEndReachedThreshold={0.1}
      />
      {props.firebase_user_name && (
        <>
          <TouchableOpacity
            style={styles.btnContainer4}
            onPress={() => addAIT()}
          >
            <Image
              source={require("../../../../assets/AddAIT.png")}
              style={styles.roundImageUpload}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnContainer3}
            onPress={() => pickImage()}
          >
            <Image
              source={require("../../../../assets/AddImage.png")}
              style={styles.roundImageUpload}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnContainer2}
            onPress={() => camera()}
          >
            <Image
              source={require("../../../../assets/TakePhoto2.png")}
              style={styles.roundImageUpload}
            />
          </TouchableOpacity>
        </>
      )}
    </>
  );
}

const mapStateToProps = (reducers) => {
  return {
    firebase_user_name: reducers.profile.firebase_user_name,
    user_photo: reducers.profile.user_photo,
    email: reducers.profile.email,
    profile: reducers.profile.profile,
    uid: reducers.profile.uid,

    savePhotoUri: reducers.post.savePhotoUri,
    actualEquipment: reducers.post.actualEquipment,
    equipmentListHeader: reducers.home.equipmentList,

    ActualServiceAITList: reducers.post.ActualServiceAITList,
  };
};

export const ConnectedPostScreen = connect(mapStateToProps, {
  saveActualEquipment,
  savePhotoUri,
  saveActualAITServicesFirebaseGlobalState,
})(PostScreen);
