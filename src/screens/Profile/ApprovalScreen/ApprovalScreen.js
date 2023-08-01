import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Linking, FlatList, Text } from "react-native";
import { Button, Icon } from "@rneui/themed";
import { getAuth, signOut } from "firebase/auth";
import { ConnectedInfoUser } from "../../../components/Account";
import { styles } from "./ApprovalScreen.styles";
import { connect } from "react-redux";
import { update_firebaseUserUid } from "../../../actions/auth";
import { ConnectedChangeDisplayNameForm } from "../../../components/Account/ChangeDisplayNameForm";
import { Modal } from "../../../components/shared/Modal";
import { getExcelPerfil } from "../../../utils/excelData";
import { update_firebaseProfile } from "../../../actions/profile";
import {
  collection,
  query,
  where,
  orderBy,
  docs,
  getDocs,
  limit,
} from "firebase/firestore";
import { db } from "../../../utils";
import { Image as ImageExpo } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { ProfileDateScreen } from "../../../components/Profile/ProfileDateScreen/ProfileDateScreen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function ApprovalScreenBare(props) {
  const navigation = useNavigation();
  const [approval, setApproval] = useState();

  //create the algoritm to have the date format of the post

  const formatDate = (dateInput) => {
    const { seconds, nanoseconds } = dateInput;
    const milliseconds = seconds * 1000 + nanoseconds / 1000000;
    const date = new Date(milliseconds);
    const monthNames = [
      "ene.",
      "feb.",
      "mar.",
      "abr.",
      "may.",
      "jun.",
      "jul.",
      "ago.",
      "sep.",
      "oct.",
      "nov.",
      "dic.",
    ];
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const formattedDate = `${day} ${month} ${year}  ${hour}:${minute} Hrs`;
    return formattedDate;
  };

  useEffect(() => {
    //this retrieve data from ServiciosAIT collections from Firestore and send it ot the global redux state
    async function fetchDataServicesList() {
      const querySnapshot = await getDocs(
        query(
          collection(db, "approvals"),
          where("ApprovalRequestSentTo", "array-contains", props.email),
          orderBy("date", "desc")
        )
      );
      const post_array = [];
      querySnapshot.forEach((doc) => {
        post_array.push(doc.data());
      });
      setApproval(post_array);
    }
    fetchDataServicesList();
  }, [props.ActualPostFirebase]);

  goToApprove = async (item) => {
    // retrieve the actual service to use the data to go to approve what is required
    const serviceQuery = await getDocs(
      query(collection(db, "ServiciosAIT"), where("idServiciosAIT", "==", item))
    );
    const post_array = [];
    serviceQuery.forEach((doc) => {
      post_array.push(doc.data());
    });

    console.log(post_array[0]);

    navigation.navigate(screen.search.tab, {
      screen: screen.search.item,
      params: { Item: post_array[0] },
    });
  };

  return (
    <KeyboardAwareScrollView>
      <Text></Text>

      {/* <Text style={styles.name}>{Item.NombreServicio}</Text> */}

      <FlatList
        data={approval}
        scrollEnabled={false}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity onPress={() => goToApprove(item.IdAITService)}>
              <View />
              <View>
                <View style={styles.equipments2}>
                  <ImageExpo
                    source={require("../../../../assets/bell1.png")}
                    style={styles.image2}
                    cachePolicy={"memory-disk"}
                  />

                  <View>
                    <Text style={styles.info2}>{item.NombreServicio}</Text>

                    <Text style={styles.info2}>{item.solicitud}</Text>

                    <Text style={styles.info2}>{formatDate(item.date)}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.date} // Provide a unique key for each item
      />
    </KeyboardAwareScrollView>
  );
}

const mapStateToProps = (reducers) => {
  return {
    profile: reducers.profile.firebase_user_name,
    email: reducers.profile.email,
    ActualPostFirebase: reducers.post.ActualPostFirebase,
  };
};

export const ApprovalScreen = connect(mapStateToProps, {
  update_firebaseUserUid,
  update_firebaseProfile,
})(ApprovalScreenBare);
