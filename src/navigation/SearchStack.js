import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SearchScreen } from "../screens";
import { ItemScreen } from "../screens/Search/ItemScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { getAuth, updateProfile } from "firebase/auth";
import { ConnectedDetailScreen } from "../screens/Search/DetailScreen/DetailScreen";
import { PolinesScreen } from "../screens/Search/DataScreen/DataScreen";
import { Image as ImageExpo } from "expo-image";

export function SearchStack() {
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
            <ImageExpo
              source={{ uri: photoURL }}
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
        name={screen.search.search}
        component={SearchScreen}
        options={{ title: " " }}
      />
      <Stack.Screen
        name={screen.search.item}
        component={ItemScreen}
        options={{ title: " " }}
      />

      <Stack.Screen
        name={screen.search.detail}
        component={ConnectedDetailScreen}
        options={{ title: " " }}
      />
      <Stack.Screen
        name={screen.search.polines}
        component={PolinesScreen}
        options={{ title: " " }}
      />
    </Stack.Navigator>
  );
}
