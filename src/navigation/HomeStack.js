import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { HomeScreen } from "../screens";
import { styles } from "./Navigation.styles";

export function HomeStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        // contentStyle: styles.globalStylesStack, // Set the background color for all screens
      }}
    >
      <Stack.Screen
        name={screen.home.home}
        component={HomeScreen}
        options={{ title: "Reportes" }}
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
