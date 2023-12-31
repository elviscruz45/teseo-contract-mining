import { TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { ConnectedHomeScreen } from "../screens";
import { ConnectedCommentScreen } from "../screens";
import { connect } from "react-redux";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { Image as ImageExpo } from "expo-image";
import { update_firebasePhoto } from "../actions/profile";
import { update_firebaseUserName } from "../actions/profile";
import { update_firebaseEmail } from "../actions/profile";
import { update_firebaseUid } from "../actions/profile";
import { saveActualAITServicesFirebaseGlobalState } from "../actions/post";

function HomeStack(props) {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  const user = getAuth().currentUser;
  const { uid, photoURL, displayName, email } = user;
  console.log("HomeStack");

  useEffect(() => {
    if (user) {
      props.update_firebasePhoto(photoURL);
      props.update_firebaseUserName(displayName);
      props.update_firebaseEmail(email);
      props.update_firebaseUid(uid);
    }
  }, [user]);

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

  return user && props.user_photo && props.profile ? (
    <>
      {console.log("HomeStackRender")}
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerTitleAlign: "center",

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
          name={screen.home.home}
          component={ConnectedHomeScreen}
          options={{ title: " " }}
        />
        <Stack.Screen
          name={screen.home.comment}
          component={ConnectedCommentScreen}
          options={{ title: " " }}
        />
      </Stack.Navigator>
    </>
  ) : null;
}

const mapStateToProps = (reducers) => {
  return {
    user_photo: reducers.profile.user_photo,
    profile: reducers.profile.profile,
  };
};

export const ConnectedHomeStack = connect(mapStateToProps, {
  update_firebasePhoto,
  update_firebaseUserName,
  update_firebaseEmail,
  update_firebaseUid,
  saveActualAITServicesFirebaseGlobalState,
})(HomeStack);
