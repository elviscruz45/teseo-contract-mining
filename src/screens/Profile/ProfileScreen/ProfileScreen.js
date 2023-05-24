import React, { useState } from "react";
import { View, TouchableOpacity, Linking } from "react-native";
import { Button, Icon } from "@rneui/themed";
import { getAuth, signOut } from "firebase/auth";
import { ConnectedInfoUser } from "../../../components/Account";
import { styles } from "./ProfileScreen.styles";
import { connect } from "react-redux";
import { update_firebaseUserUid } from "../../../actions/auth";
import { ConnectedChangeDisplayNameForm } from "../../../components/Account/ChangeDisplayNameForm";
import { Modal } from "../../../components/shared/Modal";
import { update_firebaseUserName } from "../../../actions/profile";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../utils";
import XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import { Buffer } from "buffer";
import * as Sharing from "expo-sharing";

function ProfileScreen(props) {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [_, setReload] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);

  const onReload = () => setReload((prevState) => !prevState);

  const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
    props.update_firebaseUserUid("");
    props.update_firebaseUserName("");
  };

  const update_Data = () => {
    setRenderComponent(
      <ConnectedChangeDisplayNameForm onClose={onCloseOpenModal} />
    );
    setShowModal(true);
  };
  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  const getExcel = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const post_array = [];
    querySnapshot.forEach((doc) => {
      post_array.push(doc.data());
    });

    const dataset = [
      { name: "John", age: 30 },
      { name: "Jane", age: 25 },
    ];
    const worksheet = XLSX.utils.json_to_sheet(post_array);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelFileBuffer = XLSX.write(workbook, {
      type: "array",
      bookType: "xlsx",
    });

    const base64String = Buffer.from(excelFileBuffer).toString("base64");
    const fileUri = `${FileSystem.cacheDirectory}dataset.xlsx`;

    try {
      await FileSystem.writeAsStringAsync(fileUri, base64String, {
        encoding: FileSystem.EncodingType.Base64,
      });

      Sharing.shareAsync(fileUri);
    } catch (error) {
      console.log("Error creating Excel file:", error);
    }
  };

  return (
    <View>
      <ConnectedInfoUser />

      <Button
        title="Actualizar Informacion"
        buttonStyle={styles.btnActualizarStyles}
        titleStyle={styles.btnTextStyle}
        onPress={update_Data}
      />

      <Button
        title="Cerrar sesión"
        buttonStyle={styles.btncerrarStyles}
        titleStyle={styles.btnTextStyle}
        onPress={logout}
      />
      <Modal show={showModal} close={onCloseOpenModal}>
        {renderComponent}
      </Modal>
      <Icon
        reverse
        type="material-community"
        name="plus"
        color="#8CBBF1"
        containerStyle={styles.btnContainer2}
        onPress={getExcel}
      />
    </View>
  );
}

const mapStateToProps = (reducers) => {
  return { profile: reducers.profile.firebase_user_name };
};

export const ConnectedProfileScreen = connect(mapStateToProps, {
  update_firebaseUserUid,
  update_firebaseUserName,
})(ProfileScreen);
