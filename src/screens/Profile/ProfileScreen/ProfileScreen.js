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
import { getExcelGLobal } from "../../../utils/excelData";
import { update_firebaseProfile } from "../../../actions/profile";

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
    props.update_firebaseProfile("");
  };

  const update_Data = () => {
    setRenderComponent(
      <ConnectedChangeDisplayNameForm onClose={onCloseOpenModal} />
    );
    setShowModal(true);
  };
  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  return (
    <>
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
      </View>
      <Icon
        reverse
        type="material-community"
        name="file-excel"
        color="#8CBBF1"
        containerStyle={styles.btnContainer2}
        onPress={getExcelGLobal}
      />
    </>
  );
}

const mapStateToProps = (reducers) => {
  return { profile: reducers.profile.firebase_user_name };
};

export const ConnectedProfileScreen = connect(mapStateToProps, {
  update_firebaseUserUid,
  update_firebaseProfile,
})(ProfileScreen);
