import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Button } from "@rneui/themed";
import { getAuth, signOut } from "firebase/auth";
// import { LoadingModal } from "../../../components";
// import { InfoUser, AccountOptions } from "../../../components/Account";
// import { styles } from "./UserLoggedScreen.styles";
// import { AccountOptions } from "../../../components/Account";
import { ConnectedInfoUser } from "../../../components/Account";
import { styles } from "./ProfileScreen.styles";
import { connect } from "react-redux";
import { update_firebaseUserUid } from "../../../actions/auth";
import { ConnectedChangeDisplayNameForm } from "../../../components/Account/ChangeDisplayNameForm";
import { Modal } from "../../../components/shared/Modal";
import { update_firebaseUserName } from "../../../actions/profile";

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
