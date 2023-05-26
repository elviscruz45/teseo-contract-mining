import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { styles } from "./Navigation.styles";
// import { ConnectedPostScreen } from "../screens";
import { ConnectedProfileScreen } from "../screens";

export function ProfileStack() {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  const home_screen = () => {
    navigation.navigate(screen.home.tab, {
      screen: screen.home.home,
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
      }}
    >
      <Stack.Screen
        name={screen.profile.account}
        component={ConnectedProfileScreen}
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
