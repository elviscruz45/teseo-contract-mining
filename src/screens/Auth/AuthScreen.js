import React from "react";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "./AuthScreen.styles";
import { useNavigation } from "@react-navigation/native";
import { ConnectedLoginForm } from "../../components/Auth";
import { Image as ImageExpo } from "expo-image";
import { Linking } from "react-native";

export function AuthScreen(props) {
  const navigation = useNavigation();

  const goToRegister = () => {
    Linking.openURL("https://www.teseosoftwarecompany.com/"); // to register a new user , it show to get in touch with a personel from Teseo
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.image}>
        <ImageExpo
          source={require("../../../assets/appTeseoLogol.png")}
          style={{ width: 60, height: 70 }}
          cachePolicy={"memory-disk"}
        />
        <Text></Text>
        <Text></Text>

        <ImageExpo
          source={require("../../../assets/TeseoLetra.png")}
          style={{ width: 188, height: 37 }}
          cachePolicy={"memory-disk"}
        />
      </View>
      <View>
        <ConnectedLoginForm />

        <Text style={styles.textRegister}>
          ¿Aún no tienes cuenta:{" "}
          <Text style={styles.btnRegister} onPress={goToRegister}>
            Regístrarse
          </Text>
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
}
