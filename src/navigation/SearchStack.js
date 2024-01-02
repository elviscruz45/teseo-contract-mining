import { TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SearchScreen } from "../screens";
import { ItemScreen } from "../screens/Search/ItemScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { Image as ImageExpo } from "expo-image";
import { connect } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { MoreDetailScreen } from "../screens/Search/MoreDetailScreen/MoreDetailScreen";
import { FileScreen } from "../screens/Search/FilesScreen/FileScreen";
import { DocstoApproveScreen } from "../screens/Search/DocstoApproveScreen/DocstoApproveScreen";
import { EditAITScreen } from "../screens/Search/EditAITScreen/EditAITScreen";
import { AddDocsForm } from "../components/Forms/GeneralForms/AddDocsForm/AddForms";
import { Platform } from "react-native";

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
        name={screen.search.search}
        component={SearchScreen}
        options={{
          title: " ",
          headerBackTitleVisible: false, // This hides the default back button
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name={screen.search.item}
        component={ItemScreen}
        options={{
          title: " ",
          headerBackTitleVisible: false, // This hides the default back button
          headerBackVisible: false,

          headerLeft: () =>
            Platform.OS === "ios" ? (
              <TouchableOpacity
                onPress={() => navigation.navigate(screen.search.search)}
                style={{ marginLeft: -12 }}
              >
                <AntDesign name="left" size={24} color="black" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => navigation.navigate(screen.search.search)}
                style={{ marginLeft: 0 }}
              >
                <AntDesign name="arrowleft" size={24} color="black" />
              </TouchableOpacity>
            ),
        }}
      />

      <Stack.Screen
        name={screen.search.moreDetail}
        component={MoreDetailScreen}
      />
      <Stack.Screen
        name={screen.search.pdf}
        component={FileScreen}
        options={{ title: " " }}
      />

      <Stack.Screen
        name={screen.search.approve}
        component={DocstoApproveScreen}
        options={{ title: " " }}
      />

      <Stack.Screen
        name={screen.search.editAIT}
        component={EditAITScreen}
        options={{ title: " " }}
      />

      <Stack.Screen
        name={screen.search.addDocs}
        component={AddDocsForm}
        options={{ title: " " }}
      />
    </Stack.Navigator>
  );
}

const mapStateToProps = (reducers) => {
  return {
    user_photo: reducers.profile.user_photo,
  };
};

export const SearchStack = connect(mapStateToProps, {})(SearchStackBare);
