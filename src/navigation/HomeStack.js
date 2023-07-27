import { TouchableOpacity, Image } from "react-native";
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { ConnectedHomeScreen } from "../screens";
import { ConnectedCommentScreen } from "../screens";
import { connect } from "react-redux";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { Image as ImageExpo } from "expo-image";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { update_firebasePhoto } from "../actions/profile";
import { update_firebaseUserName } from "../actions/profile";
import { update_firebaseEmail } from "../actions/profile";
import { update_firebaseUid } from "../actions/profile";
import { update_firebaseProfile } from "../actions/profile";
// import { saveActualAITServicesFirebaseGlobalState } from "../actions/post";
// import { saveTotalEventServiceAITList } from "../actions/home";
import { db } from "../utils";

function HomeStack(props) {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  useEffect(() => {
    //this retrieve data from authentication Firebase and send it to the global redux state
    const { uid, photoURL, displayName, email } = getAuth().currentUser;
    props.update_firebasePhoto(photoURL);
    props.update_firebaseUserName(displayName);
    props.update_firebaseEmail(email);
    props.update_firebaseUid(uid);

    // //this retrieve data from ServiciosAIT collections from Firestore and send it ot the global redux state
    // async function fetchDataServicesList() {
    //   const querySnapshot = await getDocs(
    //     query(
    //       collection(db, "ServiciosAIT"),
    //       orderBy("LastEventPosted", "desc")
    //     )
    //   );
    //   const post_array = [];
    //   querySnapshot.forEach((doc) => {
    //     post_array.push(doc.data());
    //   });

    //   props.saveActualAITServicesFirebaseGlobalState(post_array);
    // }
    // fetchDataServicesList();
  }, []);

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
        name={screen.home.home}
        component={ConnectedHomeScreen}
        options={{ title: " " }}
      />
      <Stack.Screen
        name={screen.home.comment}
        component={ConnectedCommentScreen}
        options={{ title: "Comentarios" }}
      />
    </Stack.Navigator>
  );
}

const mapStateToProps = (reducers) => {
  return {
    //profile global states
    user_photo: reducers.profile.user_photo,
    totalServiceAITLIST: reducers.home.totalServiceAITLIST,
  };
};

export const ConnectedHomeStack = connect(mapStateToProps, {
  update_firebasePhoto,
  update_firebaseUserName,
  update_firebaseEmail,
  update_firebaseUid,
  update_firebaseProfile,
  // saveActualAITServicesFirebaseGlobalState,
  // saveTotalEventServiceAITList,
})(HomeStack);
