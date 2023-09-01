import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Linking, FlatList, Text } from "react-native";
import { Button, Icon } from "@rneui/themed";
import { getAuth, signOut } from "firebase/auth";
import { ConnectedInfoUser } from "../../../components/Account";
import { styles } from "./ApprovalScreen.styles";
import { connect } from "react-redux";
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
import { areaLists } from "../../../utils/areaList";
import { update_approvalQuantity } from "../../../actions/profile";

function ApprovalScreenBare(props) {
  const navigation = useNavigation();
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

  goToApprove = async (item) => {
    // // retrieve the actual service to use the data to go to approve what is required
    // const serviceQuery = await getDocs(
    //   query(collection(db, "ServiciosAIT"), where("idServiciosAIT", "==", item))
    // );
    // const post_array = [];
    // serviceQuery.forEach((doc) => {
    //   post_array.push(doc.data());
    // });
    // console.log("querySnapshot1");

    navigation.navigate(screen.search.tab, {
      screen: screen.search.item,
      params: { Item: item },

      // params: { Item: post_array[0] },
    });
  };

  // <ConnectedInfoUser bellQuantity={props?.approvalList?.length} />

  let approvalListPending = props.approvalListNew.filter((item) => {
    return !(
      item.ApprovalPerformed?.includes(props.email) ||
      item.RejectionPerformed?.includes(props.email)
    );
  });

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: "white" }} // Add backgroundColor here
    >
      <Text></Text>

      {/* <Text style={styles.name}>{Item.NombreServicio}</Text> */}

      <FlatList
        data={approvalListPending}
        scrollEnabled={false}
        renderItem={({ item, index }) => {
          //the algoritm to retrieve the image source to render the icon
          const area = item.AreaServicio;
          const indexareaList = areaLists.findIndex(
            (item) => item.value === area
          );
          const imageSource = areaLists[indexareaList]?.image;
          return (
            <TouchableOpacity onPress={() => goToApprove(item.IdAITService)}>
              <View />
              <View>
                <View style={styles.equipments2}>
                  {item.photoServiceURL ? (
                    <ImageExpo
                      source={{ uri: item.photoServiceURL }}
                      style={styles.image2}
                      cachePolicy={"memory-disk"}
                    />
                  ) : (
                    <ImageExpo
                      source={imageSource}
                      style={styles.image2}
                      cachePolicy={"memory-disk"}
                    />
                  )}

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
    approvalListNew: reducers.search.approvalListNew,

    ActualPostFirebase: reducers.post.ActualPostFirebase,
    approvalList: reducers.home.approvalList,
    totalEventServiceAITLIST: reducers.home.totalEventServiceAITLIST,
  };
};

export const ApprovalScreen = connect(mapStateToProps, {
  update_firebaseProfile,
  update_approvalQuantity,
})(ApprovalScreenBare);
