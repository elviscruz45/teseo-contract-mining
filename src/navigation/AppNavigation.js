import { View, Text, ImageBackground } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import React from "react";
import { Icon } from "@rneui/themed";
import { screen } from "../utils";
import { ConnectedHomeStack } from "./HomeStack";
import { PostStack } from "./PostStack";
import { ActivityStack } from "./ActivityStack";
import { ProfileStack } from "./ProfileStack";
import { SearchStack } from "./SearchStack";
import { styles } from "./Navigation.styles";

// const backgroundImage = require("../../assets/cerro3.jpeg");

export function AppNavigation() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#2F80ED",
        tabBarInactiveTintColor: "black",
        tabBarIcon: ({ color, size }) => screenOptions(route, color, size),
        tabBarStyle: styles.globalStylesTab,
      })}
    >
      <Tab.Screen
        name={screen.home.tab}
        component={ConnectedHomeStack}
        options={{ title: "Inicio" }}
      />
      <Tab.Screen
        name={screen.search.tab}
        component={SearchStack}
        options={{ title: "Buscar" }}
      />
      <Tab.Screen
        name={screen.post.tab}
        component={PostStack}
        options={{ title: "Publicar" }}
      />
      <Tab.Screen
        name={screen.activity.tab}
        component={ActivityStack}
        options={{ title: "Actividad" }}
      />
      <Tab.Screen
        name={screen.profile.tab}
        component={ProfileStack}
        options={{ title: "Perfil" }}
      />
    </Tab.Navigator>
  );
}

function screenOptions(route, color, size) {
  let iconName;

  if (route.name === screen.home.tab) {
    iconName = "home-outline";
  }

  if (route.name === screen.search.tab) {
    iconName = "magnify";
  }

  if (route.name === screen.post.tab) {
    iconName = "plus-circle-outline";
  }
  if (route.name === screen.activity.tab) {
    iconName = "human-greeting-proximity";
  }
  if (route.name === screen.profile.tab) {
    iconName = "account-outline";
  }

  return (
    <Icon type="material-community" name={iconName} color={color} size={size} />
  );
}
