import React, { useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Avatar, Text, Icon } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { styles } from "./InfoUser.styles";
import { Modal } from "../Modal";
import { connect } from "react-redux";
import { update_firebasePhoto } from "../../../actions/profile";
import { update_firebaseEmail } from "../../../actions/profile";
import { update_firebaseProfile } from "../../../actions/profile";
import { update_firebaseUid } from "../../../actions/profile";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { ChangeManPower } from "../../Profile/ManPowerForm/ChangeManPower";
function InfoUser(props) {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);

  const [avatar, setAvatar] = useState(props.user_photo);
  const user = getAuth().currentUser;
  const navigation = useNavigation();

  const changeAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled) uploadImage(result.assets[0].uri);
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
    setLoading(false);
    props.update_firebasePhoto(imageUrl);
  };

  const goToApprovalScreen = () => {
    navigation.navigate(screen.profile.tab, {
      screen: screen.profile.approvals,
    });
  };

  const updateManpower = () => {
    setRenderComponent(<ChangeManPower onClose={onCloseOpenModal} />);
    setShowModal(true);
  };
  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  let approvalListPending = props.approvalListNew?.filter((item) => {
    return !(
      item.ApprovalPerformed?.includes(props.email) ||
      item.RejectionPerformed?.includes(props.email)
    );
  });

  return (
    <>
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
          {props.profile?.descripcion && (
            <Text>{props.profile.descripcion}</Text>
          )}
        </View>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>

        {props.email === "daniel@prodise.com" && (
          <TouchableOpacity
            style={styles.btnContainer4}
            onPress={() => updateManpower()}
          >
            <Image
              source={require("../../../../assets/manpower2.png")}
              style={styles.roundImageUpload2}
            />
          </TouchableOpacity>
        )}

        <Text> </Text>
        <TouchableOpacity
          style={styles.btnContainer4}
          onPress={() => goToApprovalScreen()}
        >
          <Image
            source={require("../../../../assets/bell1.png")}
            style={styles.roundImageUpload}
          />
        </TouchableOpacity>

        {approvalListPending && (
          <Text style={styles.bellNomber}>{approvalListPending.length}</Text>
        )}
      </View>
      <Modal show={showModal} close={onCloseOpenModal}>
        {renderComponent}
      </Modal>
    </>
  );
}

const mapStateToProps = (reducers) => {
  return {
    profile: reducers.profile.profile,
    user_photo: reducers.profile.user_photo,
    email: reducers.profile.email,
    uid: reducers.profile.uid,
    approvalListNew: reducers.search.approvalListNew,
  };
};

export const ConnectedInfoUser = connect(mapStateToProps, {
  update_firebasePhoto,
  update_firebaseEmail,
  update_firebaseProfile,
  update_firebaseUid,
})(InfoUser);
