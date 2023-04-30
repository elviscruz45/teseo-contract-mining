import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { styles } from "./Navigation.styles";
import { ConnectedPostScreen } from "../screens";
import { getAuth, updateProfile } from "firebase/auth";
import { ConnectedCameraScreen } from "../screens";
import { ConnectedInformationScreen } from "../screens";
import { PolinesScreen } from "../screens";
import { PolinesAddInformationScreen } from "../screens/Post/PolinesAddInformationScreen";
export function PostStack() {
  const Stack = createNativeStackNavigator();
  const { uid, photoURL, displayName, email } = getAuth().currentUser;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerLeft: () => (
          <TouchableOpacity onPress={() => profile_screen()}>
            <Image
              source={require("../../assets/logoTeseo1.png")}
              style={{ width: 90, height: 18 }}
            />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => profile_screen()}>
            <Image
              source={{ uri: photoURL }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                margin: 0,
              }}
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        name={screen.post.post}
        component={ConnectedPostScreen}
        options={{ title: " " }}
      />
      <Stack.Screen
        name={screen.post.camera}
        component={ConnectedCameraScreen}
        options={{ title: " " }}
      />
      <Stack.Screen
        name={screen.post.form}
        component={ConnectedInformationScreen}
        options={{ title: "Formulario" }}
      />
      <Stack.Screen
        name={screen.post.polines}
        component={PolinesScreen}
        options={{ title: "Polines" }}
      />
      <Stack.Screen
        name={screen.post.addpolines}
        component={PolinesAddInformationScreen}
        options={{ title: "AddPolines" }}
      />
    </Stack.Navigator>
  );
}
