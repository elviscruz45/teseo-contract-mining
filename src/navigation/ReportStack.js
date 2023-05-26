import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ReportScreen } from "../screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { getAuth, updateProfile } from "firebase/auth";

export function ReportStack() {
  const Stack = createNativeStackNavigator();
  const { uid, photoURL, displayName, email } = getAuth().currentUser;

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
        headerLeft: () => (
          <TouchableOpacity onPress={() => home_screen()}>
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
