import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { ConnectedHomeScreen } from "../screens";
import { ConnectedCommentScreen } from "../screens";
import { styles } from "./Navigation.styles";
import { connect } from "react-redux";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { Image as ImageExpo } from "expo-image";
import { update_firebasePhoto } from "../actions/profile";
import { update_firebaseUserName } from "../actions/profile";
import { update_firebaseEmail } from "../actions/profile";
import { update_firebaseUid } from "../actions/profile";
import { update_firebaseProfile } from "../actions/profile";

function HomeStack(props) {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  useEffect(() => {
    const { uid, photoURL, displayName, email } = getAuth().currentUser;
    props.update_firebasePhoto(photoURL);
    props.update_firebaseUserName(displayName);
    props.update_firebaseEmail(email);
    props.update_firebaseUid(uid);
  }, []);

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
              source={require("../../assets/logoTeseo1.png")}
              style={{ width: 90, height: 18 }}
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
        options={{ title: "Comentarios" }}
      />
    </Stack.Navigator>
  );
}

const mapStateToProps = (reducers) => {
  return {
    firebase_user_name: reducers.profile.firebase_user_name,
    user_photo: reducers.profile.user_photo,
    email: reducers.profile.email,
    profile: reducers.profile.profile,
    uid: reducers.profile.uid,

    savePhotoUri: reducers.post.savePhotoUri,
    actualEquipment: reducers.post.actualEquipment,
  };
};

export const ConnectedHomeStack = connect(mapStateToProps, {
  update_firebasePhoto,
  update_firebaseUserName,
  update_firebaseEmail,
  update_firebaseUid,
  update_firebaseProfile,
})(HomeStack);
