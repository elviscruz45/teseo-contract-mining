import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SearchScreen } from "../screens";
import { ItemScreen } from "../screens/Search/ItemScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { ConnectedDetailScreen } from "../screens/Search/DetailScreen/DetailScreen";
import { PolinesScreen } from "../screens/Search/DataScreen/DataScreen";
import { Image as ImageExpo } from "expo-image";
import { connect } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { MoreDetailScreen } from "../screens/Search/MoreDetailScreen/MoreDetailScreen";

function SearchStackBare(props) {
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
      initialRouteName={screen.search.search}
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
        name={screen.search.search}
        component={SearchScreen}
        options={{ title: " " }}
      />
      <Stack.Screen
        name={screen.search.item}
        component={ItemScreen}
        options={{
          title: " ",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate(screen.search.search)}
              style={{ marginLeft: -12 }}
            >
              <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name={screen.search.moreDetail}
        component={MoreDetailScreen}
        // options={{
        //   title: " ",
        //   headerLeft: () => (
        //     <TouchableOpacity
        //       onPress={() => navigation.goBack()}
        //       style={{ marginLeft: -12 }}
        //     >
        //       <AntDesign name="left" size={24} color="black" />
        //     </TouchableOpacity>
        //   ),
        // }}
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

export const SearchStack = connect(mapStateToProps, {})(SearchStackBare);
