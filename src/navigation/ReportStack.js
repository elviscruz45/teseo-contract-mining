import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ReportScreen } from "../screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { getAuth, updateProfile } from "firebase/auth";
import { Image as ImageExpo } from "expo-image";
import { connect } from "react-redux";

function ReportStackBare(props) {
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
        name={screen.report.report}
        component={ReportScreen}
        options={{ title: " " }}
      />
      {/* <Stack.Screen
        name={screen.homestack.data}
        component={DataScreen}
        options={{ title: "Conveyor Belt" }}
      />
      <Stack.Screen
        name={screen.homestack.graphic}
        component={GraphicScreen}
        options={{ title: "Conveyor Belt" }}
      />

      <Stack.Screen
        name={screen.homestack.changes}
        component={ChangesScreen}
        options={{ title: "Conveyor Belt" }}
      /> */}
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

export const ReportStack = connect(mapStateToProps, {})(ReportStackBare);
