import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { getAuth, updateProfile } from "firebase/auth";
import { Image as ImageExpo } from "expo-image";
import { connect } from "react-redux";
import { HistoryScreen } from "../screens/Report/HistoryScreen/HistoryScreen";
import { ReportScreen } from "../screens";

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
        name={screen.report.report}
        component={ReportScreen}
        options={{ title: " " }}
      />
      <Stack.Screen
        name={screen.report.history}
        component={HistoryScreen}
        options={{ title: " " }}
      />
      {/*
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
    user_photo: reducers.profile.user_photo,
  };
};

export const ReportStack = connect(mapStateToProps, {})(ReportStackBare);
