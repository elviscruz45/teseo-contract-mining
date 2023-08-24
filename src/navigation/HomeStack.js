import { TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { ConnectedHomeScreen } from "../screens";
import { ConnectedCommentScreen } from "../screens";
import { connect } from "react-redux";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { Image as ImageExpo } from "expo-image";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { update_firebasePhoto } from "../actions/profile";
import { update_firebaseUserName } from "../actions/profile";
import { update_firebaseEmail } from "../actions/profile";
import { update_firebaseUid } from "../actions/profile";
import { saveActualAITServicesFirebaseGlobalState } from "../actions/post";
import { db } from "../utils";
import { saveApprovalListnew } from "../actions/search";

function HomeStack(props) {
  console.log("100.---HomeStackScreen");
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  const [email, setEmail] = useState();

  useEffect(() => {
    const user = getAuth().currentUser;

    //this retrieve data from authentication Firebase and send it to the global redux state

    const { uid, photoURL, displayName, email } = user;

    if (user) {
      props.update_firebasePhoto(photoURL);
      props.update_firebaseUserName(displayName);
      props.update_firebaseEmail(email);
      props.update_firebaseUid(uid);

      async function fetchFirebaseData() {
        try {
          //this retrieve data from ServiciosAIT to show it in the header of homescreen collections from Firestore and send it ot the global redux state

          const querySnapshot = await getDocs(
            query(
              collection(db, "ServiciosAIT"),
              // where("AvanceAdministrativoTexto", "!=", "Contratista-Fin servicio")
              orderBy("LastEventPosted", "desc")
            )
          );
          const post_array = [];
          querySnapshot.forEach((doc) => {
            post_array.push(doc.data());
          });
          console.log("100.ServiciosAIT", post_array);
          props.saveActualAITServicesFirebaseGlobalState(post_array);
          setEmail(email);
        } catch (error) {
          console.error("Error fetching Firebase data: ", error);
        }
      }

      fetchFirebaseData();
    }
  }, []);

  useEffect(() => {
    //this retrieve data from ServiciosAIT collections from Firestore and send it ot the global redux state

    if (email) {
      async function fetchDataApprovalList() {
        const querySnapshot = await getDocs(
          query(
            collection(db, "approvals"),
            where("ApprovalRequestSentTo", "array-contains", email),
            orderBy("date", "desc")
          )
        );

        const post_array = [];
        querySnapshot.forEach((doc) => {
          post_array.push(doc.data());
        });
        const filteredArray = post_array.filter(
          (element) =>
            !(
              element.ApprovalPerformed?.includes(props.email) ||
              element.RejectionPerformed?.includes(props.email)
            )
        );

        console.log("100.approvals", post_array.length, post_array);

        props.saveApprovalListnew(filteredArray);
      }

      fetchDataApprovalList();
    }
  }, [email]);

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

  return props.email && props.user_photo ? (
    <>
      {console.log("HOMESTACKRENDERES COUNT")}
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
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
          name={screen.home.home}
          component={ConnectedHomeScreen}
          options={{ title: " " }}
        />
        <Stack.Screen
          name={screen.home.comment}
          component={ConnectedCommentScreen}
          options={{ title: " " }}
        />
      </Stack.Navigator>
    </>
  ) : null;
}

const mapStateToProps = (reducers) => {
  return {
    email: reducers.profile.email,
    user_photo: reducers.profile.user_photo,
  };
};

export const ConnectedHomeStack = connect(mapStateToProps, {
  update_firebasePhoto,
  update_firebaseUserName,
  update_firebaseEmail,
  update_firebaseUid,
  saveActualAITServicesFirebaseGlobalState,
  saveApprovalListnew,
})(HomeStack);
