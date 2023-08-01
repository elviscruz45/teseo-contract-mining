import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Linking, FlatList, Text } from "react-native";
import { Button, Icon } from "@rneui/themed";
import { getAuth, signOut } from "firebase/auth";
import { ConnectedInfoUser } from "../../../components/Account";
import { styles } from "./DocstoApproveScreen.styles";
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
  onSnapshot,
  docs,
  getDocs,
  limit,
} from "firebase/firestore";
import { db } from "../../../utils";
import { Image as ImageExpo } from "expo-image";
import { screen } from "../../../utils";
import { ProfileDateScreen } from "../../../components/Profile/ProfileDateScreen/ProfileDateScreen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function DocstoApproveScreenBare(props) {
  const [approval, setApproval] = useState();
  console.log(approval);
  //Retrieve data Item that comes from the previous screen to render the Updated Status
  const {
    route: {
      params: { Item },
    },
  } = props;

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
    let unsubscribe;

    async function fetchData() {
      let queryRef = query(
        collection(db, "approvals"),
        orderBy("date", "desc"),
        where("IdAITService", "==", Item.idServiciosAIT)
      );

      unsubscribe = onSnapshot(queryRef, (ItemFirebase) => {
        const lista = [];
        ItemFirebase.forEach((doc) => {
          lista.push(doc.data());
        });
        console.log("55.OnSnapshopDocsApprovalScreen");
        setApproval(lista);
      });
    }

    fetchData();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

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
                    source={require("../../../../assets/pdf4.png")}
                    style={styles.image2}
                    cachePolicy={"memory-disk"}
                  />

                  <View>
                    <View style={[styles.row, styles.center]}>
                      <Text style={styles.info}>{"Solicitud:  "}</Text>
                      <Text style={styles.info2}>{item.solicitud}</Text>
                    </View>

                    <View style={[styles.row, styles.center]}>
                      <Text style={styles.info}>{"Nombre Archivo:  "}</Text>
                      <Text style={styles.info2}>{item.fileName}</Text>
                    </View>

                    <View style={[styles.row, styles.center]}>
                      <Text style={styles.info}>{"Autor:  "}</Text>
                      <Text style={styles.info2}>
                        {item.ApprovalRequestedBy}
                      </Text>
                    </View>

                    <View style={[styles.row, styles.center]}>
                      <Text style={styles.info}>{"Fecha:  "}</Text>
                      <Text style={styles.info2}>{formatDate(item.date)}</Text>
                    </View>

                    <View style={[styles.row, styles.center]}>
                      <Text style={styles.info}>{"Aprobadores:  "}</Text>
                      <Text style={styles.info2}>
                        {item.ApprovalRequestSentTo.join(",")}
                      </Text>
                    </View>

                    <View style={[styles.row, styles.center]}>
                      <Text style={styles.info}>{"Aprobaciones:  "}</Text>
                      <Text style={styles.info2}>{item.ApprovalPerformed}</Text>
                    </View>

                    <Text></Text>
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

export const DocstoApproveScreen = connect(mapStateToProps, {
  update_firebaseUserUid,
  update_firebaseProfile,
})(DocstoApproveScreenBare);
