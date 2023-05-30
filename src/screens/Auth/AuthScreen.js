import React, { Component } from "react";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "./AuthScreen.styles";
import { useNavigation } from "@react-navigation/native";
import { ConnectedLoginForm } from "../../components/Auth";
import { Image as ImageExpo } from "expo-image";

export function AuthScreen(props) {
  const navigation = useNavigation();

  const goToRegister = () => {
    navigation.navigate();
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.image}>
        <ImageExpo
          source={require("../../../assets/logoteseoficial.png")}
          style={{ width: 60, height: 70 }}
          cachePolicy={"memory-disk"}
        />
        <Text></Text>
        <Text></Text>

        <ImageExpo
          source={require("../../../assets/LogoNameTeseo.png")}
          style={{ width: 152, height: 37 }}
          cachePolicy={"memory-disk"}
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
