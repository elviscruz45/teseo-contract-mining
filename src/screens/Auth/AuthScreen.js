import React, { Component } from "react";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
// import { updateEmail, updatePassword, login } from "../actions/user";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "./AuthScreen.styles";
import { useNavigation } from "@react-navigation/native";
import { ConnectedLoginForm } from "../../components/Auth";

export function AuthScreen(props) {
  const navigation = useNavigation();

  const goToRegister = () => {
    navigation.navigate();
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.image}>
        <Image
          source={require("../../../assets/logoteseoficial.png")}
          style={{ width: 60, height: 70 }}
        />
        <Text></Text>
        <Text></Text>

        <Image
          source={require("../../../assets/LogoNameTeseo.png")}
          style={{ width: 152, height: 37 }}
        />
      </View>
      <View>
        <ConnectedLoginForm />

        <Text style={styles.textRegister}>
          ¿Aún no tienes cuenta
          <Text style={styles.btnRegister} onPress={goToRegister}>
            Regístrarse
          </Text>
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
}
