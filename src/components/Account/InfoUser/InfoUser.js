import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Avatar, Text, Icon } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { styles } from "./InfoUser.styles";
import { ConnectedChangeDisplayNameForm } from "../ChangeDisplayNameForm";
import { Modal } from "../Modal";
import { connect } from "react-redux";
import { update_firebasePhoto } from "../../../actions/profile";
import { update_firebaseEmail } from "../../../actions/profile";
import { update_firebaseProfile } from "../../../actions/profile";
import { update_firebaseUid } from "../../../actions/profile";

function InfoUser(props) {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [avatar, setAvatar] = useState(props.user_photo);

  const user = getAuth().currentUser;
  const changeAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled) uploadImage(result.uri);
  };

  const uploadImage = async (uri) => {
    setLoadingText("Actualizando Avatar");
    setLoading(true);

    const response = await fetch(uri);
    const blob = await response.blob();

    const storage = getStorage();
    const storageRef = ref(storage, `avatar/${props.uid}`);

    uploadBytes(storageRef, blob).then((snapshot) => {
      updatePhotoUrl(snapshot.metadata.fullPath);
    });
  };

  const updatePhotoUrl = async (imagePath) => {
    const storage = getStorage();
    const imageRef = ref(storage, imagePath);

    const imageUrl = await getDownloadURL(imageRef);

    const auth = getAuth();
    updateProfile(auth.currentUser, { photoURL: imageUrl });

    setAvatar(imageUrl);
    props.update_firebasePhoto(imageUrl);
    setLoading(false);
  };

  return (
    <View style={styles.content}>
      <Avatar
        size="large"
        rounded
        containerStyle={styles.avatar}
        icon={{ type: "material", name: "person" }}
        source={{ uri: avatar }}
      >
        <Avatar.Accessory size={24} onPress={changeAvatar} />
      </Avatar>

      <View>
        {props.profile?.displayNameform && (
          <Text style={styles.displayName}>
            {props.profile.displayNameform}
          </Text>
        )}

        <Text>{props.email}</Text>
        {props.profile?.cargo && <Text>{props.profile.cargo}</Text>}
        {props.profile?.descripcion && <Text>{props.profile.descripcion}</Text>}
      </View>
    </View>
  );
}

const mapStateToProps = (reducers) => {
  return {
    profile: reducers.profile.profile,
    firebase_user_name: reducers.profile.firebase_user_name,
    user_photo: reducers.profile.user_photo,
    email: reducers.profile.email,
    uid: reducers.profile.uid,

    savePhotoUri: reducers.post.savePhotoUri,
    actualEquipment: reducers.post.actualEquipment,
  };
};

export const ConnectedInfoUser = connect(mapStateToProps, {
  update_firebasePhoto,
  update_firebaseEmail,
  update_firebaseProfile,
  update_firebaseUid,
})(InfoUser);
