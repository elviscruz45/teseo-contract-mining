import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { styles } from "./Navigation.styles";
import { ConnectedPostScreen } from "../screens";
import { ConnectedCameraScreen } from "../screens";
import { ConnectedInformationScreen } from "../screens";
import { AITScreen } from "../screens/Post/AITScreen";

import { useNavigation } from "@react-navigation/native";
import { Image as ImageExpo } from "expo-image";
import { connect } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

function PostStackBare(props) {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  const home_screen = () => {
    navigation.navigate(screen.home.tab, {
      screen: screen.home.home,
    });
  };

  const profile_screen = () => {
    navigation.navigate(screen.profile.tab, {
      screen: screen.profile.account,
    });
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitle: () => (
          <TouchableOpacity onPress={() => home_screen()}>
            <Image
              source={require("../../assets/teseoLong.png")}
              style={{ width: 130, height: 25 }}
            />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => profile_screen()}>
            <ImageExpo
              source={{ uri: props.user_photo }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                margin: 0,
              }}
              cachePolicy={"memory-disk"}
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        name={screen.post.post}
        component={ConnectedPostScreen}
        options={{
          title: " ",
        }}
      />
      <Stack.Screen
        name={screen.post.camera}
        component={ConnectedCameraScreen}
        options={{
          title: " ",
          headerTransparent: false,
          headerShown: true,
          headerBackTitle: "Home",
          headerTintColor: "black",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate(screen.post.post)}
              style={{ marginLeft: -12 }}
            >
              <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name={screen.post.form}
        component={ConnectedInformationScreen}
        options={{
          title: " ",
          headerTransparent: false,
          headerShown: true,
          headerBackTitle: "Home",
          headerTintColor: "black",
        }}
      />
      <Stack.Screen
        name={screen.post.aitform}
        component={AITScreen}
        options={{
          title: " ",
          headerTransparent: false,
          headerShown: true,
          headerBackTitle: "Publicar",
          headerTintColor: "black",
        }}
      />
    </Stack.Navigator>
  );
}

const mapStateToProps = (reducers) => {
  return reducers.profile;
};

export const PostStack = connect(mapStateToProps, {})(PostStackBare);
