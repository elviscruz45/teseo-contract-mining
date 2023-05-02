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
import { equipmentList } from "../../../utils/equipmentList";
import { getAuth, updateProfile } from "firebase/auth";

function PostScreen(props) {
  const emptyimage = require("../../../../assets/splash.png");
  const [photos, setPhotos] = useState([]);
  const navigation = useNavigation();
  const { uid, photoURL, displayName, email } = getAuth().currentUser;
  const [equipment, setEquipment] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const pickImage = async () => {
    if (!equipment) return;
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      console.log("Upload Image");
    }
    setEquipment(null);
  };

  const camera = () => {
    if (!equipment) return;
    console.log("camera");
    navigation.navigate(screen.post.camera);
    setEquipment(null);
  };

  const selectAsset = (equipment) => {
    setEquipment(equipment);
    props.saveActualEquipment(equipment);
    console.log(props);
  };

  return (
    <>
      <SearchBar
        placeholder="Busca tu numero de polin o faja"
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
            source={{ uri: photoURL }}
          ></Avatar>
          <View>
            <Text style={styles.name}>{displayName || "Anónimo"}</Text>
            <Text style={styles.info}>{email}</Text>
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
            source={equipment?.image || emptyimage}
          ></Avatar>
          <View>
            <Text style={styles.name}>
              {equipment?.tag || "Selecciona Equipo"}
            </Text>
            <Text style={styles.info}>
              {equipment?.nombre || "de la lista"}
            </Text>
          </View>
        </View>
      </View>
      <Text></Text>

      <FlatList
        data={equipmentList}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity onPress={() => selectAsset(item)}>
              <View style={styles.equipments}>
                <Image source={item.image} style={styles.image} />
                <View>
                  <Text style={styles.name}>{item.tag}</Text>
                  <Text style={styles.info}>{item.nombre}</Text>
                  <Text style={styles.info}>{item.caracteristicas}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <TouchableOpacity
        style={styles.btnContainer3}
        onPress={() => pickImage()}
      >
        <Image
          source={require("../../../../assets/AddImage.png")}
          style={styles.roundImageUpload}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnContainer2} onPress={() => camera()}>
        <Image
          source={require("../../../../assets/TakePhoto2.png")}
          style={styles.roundImageUpload}
        />
      </TouchableOpacity>
    </>
  );
}

const mapStateToProps = (reducers) => {
  return {
    firebase_user_name: reducers.profile.firebase_user_name,
    user_photo: reducers.profile.user_photo,
    savePhotoUri: reducers.post.savePhotoUri,
    actualEquipment: reducers.post.actualEquipment,
  };
};

export const ConnectedPostScreen = connect(mapStateToProps, {
  saveActualEquipment,
})(PostScreen);
