import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Avatar, Text } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { styles } from "./InfoUser.styles";
import { ConnectedChangeDisplayNameForm } from "../ChangeDisplayNameForm";
import { Modal } from "../Modal";
import { connect } from "react-redux";
import { update_firebasePhoto } from "../../../actions/profile";

function InfoUser(props) {
  // const { setLoading, setLoadingText } = props;
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const { uid, photoURL, displayName, email } = getAuth().currentUser;
  const [avatar, setAvatar] = useState(photoURL);
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);

  const user = getAuth().currentUser;
  console.log("prospInfoUser", props);
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
    const storageRef = ref(storage, `avatar/${uid}`);

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
    console.log("propsInfoUsers", props);
    setLoading(false);
  };

  const update_Name = () => {
    setRenderComponent(
      <ConnectedChangeDisplayNameForm onClose={onCloseOpenModal} />
    );
    setShowModal(true);
  };
  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

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
        <TouchableOpacity onPress={update_Name}>
          <Text style={styles.displayName}>{displayName || "Anónimo"}</Text>
        </TouchableOpacity>

        <Text>{email}</Text>
      </View>
      <Modal show={showModal} close={onCloseOpenModal}>
        {renderComponent}
      </Modal>
    </View>
  );
}

const mapStateToProps = (reducers) => {
  return reducers.profile;
};

export const ConnectedInfoUser = connect(mapStateToProps, {
  update_firebasePhoto,
})(InfoUser);
