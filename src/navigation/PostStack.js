import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { styles } from "./Navigation.styles";
import { ConnectedPostScreen } from "../screens";

export function PostStack() {
  const Stack = createNativeStackNavigator();

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
              source={require("../../assets/Elvis_Cruz_Formal.jpg")}
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
