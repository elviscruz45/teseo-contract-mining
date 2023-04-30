import React, { useState } from "react";
import { View } from "react-native";
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

function ProfileScreen(props) {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [_, setReload] = useState(false);

  const onReload = () => setReload((prevState) => !prevState);

  const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
    props.update_firebaseUserUid("");
  };

  return (
    <View>
      <ConnectedInfoUser />
      <Button
        title="Cerrar sesión"
        buttonStyle={styles.btnStyles}
        titleStyle={styles.btnTextStyle}
        onPress={logout}
      />
    </View>
  );
}

const mapStateToProps = (reducers) => {
  return reducers.auth;
};

export const ConnectedProfileScreen = connect(mapStateToProps, {
  update_firebaseUserUid,
})(ProfileScreen);
