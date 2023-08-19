import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  TouchableOpacity,
  Linking,
  FlatList,
  Text,
  Alert,
} from "react-native";
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
  arrayUnion,
  arrayRemove,
  updateDoc,
  limit,
  doc,
} from "firebase/firestore";
import { db } from "../../../utils";
import { Image as ImageExpo } from "expo-image";
import { screen } from "../../../utils";
import { ProfileDateScreen } from "../../../components/Profile/ProfileDateScreen/ProfileDateScreen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { update_approvalList } from "../../../actions/home";
import { saveApprovalListnew } from "../../../actions/search";
function DocstoApproveScreenBare(props) {
  const [approval, setApproval] = useState();

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
        console.log("55111.OnSnapshopDocsApprovalScreen");
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

  //Approval

  const docAprovals = async (emailUser, approvalPerformed, idApproval) => {
    const PostRef = doc(db, "approvals", idApproval);

    Alert.alert(
      "Aprobacion",
      "Estas Seguro de Aprobar esta Solicitud?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Aprobar",
          onPress: async () => {
            if (approvalPerformed?.includes(emailUser)) {
              await updateDoc(PostRef, {
                ApprovalPerformed: arrayRemove(emailUser),
              });
            } else {
              await updateDoc(PostRef, {
                ApprovalPerformed: arrayUnion(emailUser),
              });
            }
            //aquie es
          },
        },
      ],
      { cancelable: false }
    );
  };

  //Rejection
  const docRejection = async (emailUser, RejectionPerformed, idApproval) => {
    const PostRef = doc(db, "approvals", idApproval);

    Alert.alert(
      "Desaprobacion",
      "Estas Seguro de Desaprobar esta Solicitud?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Aceptar",
          onPress: async () => {
            if (RejectionPerformed?.includes(emailUser)) {
              await updateDoc(PostRef, {
                RejectionPerformed: arrayRemove(emailUser),
              });
            } else {
              await updateDoc(PostRef, {
                RejectionPerformed: arrayUnion(emailUser),
              });
            }
            //aquie es
          },
        },
      ],
      { cancelable: false }
    );
  };

  //---This is used to get the attached file in the post that contain an attached file---
  const uploadFile = useCallback(async (uri) => {
    // console.log("pdfHomescreen", uri);
    try {
      const supported = await Linking.canOpenURL(uri);
      if (supported) {
        await Linking.openURL(uri);
      } else {
        alert("Este archivo no tiene Documento adjunto");
      }
    } catch (error) {
      alert("No Hay Documento Adjunto", error);
    }
  }, []);

  return (
    <KeyboardAwareScrollView>
      <FlatList
        data={approval}
        style={{ backgroundColor: "white" }} // Add backgroundColor here
        scrollEnabled={false}
        renderItem={({ item, index }) => {
          const approvalRequestedLength = item.ApprovalRequestSentTo.length;
          const approvalPerformedLength = item.ApprovalPerformed.length;
          const approvalRequested = item.ApprovalRequestSentTo;
          const approvalPerformed = item.ApprovalPerformed;
          const RejectionPerformed = item.RejectionPerformed;
          const emailUser = props.email;
          const isIncludedapprovalRequested =
            approvalRequested.includes(emailUser);

          const isIncludedapprovalPerformed =
            approvalPerformed.includes(emailUser);
          const isIncludedRectionPerformed =
            RejectionPerformed.includes(emailUser);
          const idApproval = item.idApproval;
          console.log("approvalRequested:", approvalRequested);
          console.log("approvalPerformed:", approvalPerformed);
          console.log("emailUser:", emailUser);
          console.log(
            "isIncludedapprovalPerformed:",
            isIncludedapprovalPerformed
          );

          return (
            <View
              style={{
                borderBottomWidth: 5,
                borderBottomColor: "#f0f8ff",
              }}
            >
              <View>
                <View style={styles.equipments2}>
                  <View style={styles.image2}>
                    <TouchableOpacity onPress={() => uploadFile(item.pdfFile)}>
                      <ImageExpo
                        source={
                          item.pdfFile
                            ? require("../../../../assets/docIcon.png")
                            : require("../../../../assets/mailIcon.png")
                        }
                        style={styles.image3}
                        cachePolicy={"memory-disk"}
                      />
                    </TouchableOpacity>
                    <ImageExpo
                      source={
                        approvalRequestedLength === approvalPerformedLength
                          ? require("../../../../assets/approvalGreen.png")
                          : approvalPerformedLength > 0
                          ? require("../../../../assets/approvalYellow.png")
                          : require("../../../../assets/rejectedRed.png")
                      }
                      style={styles.image4}
                      cachePolicy={"memory-disk"}
                    />
                  </View>
                  <View style={styles.article}>
                    <View style={[styles.row, styles.center]}>
                      <Text style={styles.info}>{"Solicitud:"}</Text>
                      <Text style={styles.info2} selectable={true}>
                        {item.solicitudComentario}
                      </Text>
                    </View>
                    <View style={[styles.row, styles.center]}>
                      <Text style={styles.info}>{"Tipo:        "}</Text>
                      <Text style={styles.info2}>{item.solicitud}</Text>
                    </View>

                    <View style={[styles.row, styles.center]}>
                      <Text style={styles.info}>{"Archivo:  "}</Text>
                      <Text style={styles.info2}>{item.fileName}</Text>
                    </View>

                    <View style={[styles.row, styles.center]}>
                      <Text style={styles.info}>{"Autor:      "}</Text>
                      <Text style={styles.info2}>
                        {item.ApprovalRequestedBy}
                      </Text>
                    </View>

                    <View style={[styles.row, styles.center]}>
                      <Text style={styles.info}>{"Fecha:     "}</Text>
                      <Text style={styles.info2}>{formatDate(item.date)}</Text>
                    </View>

                    <View style={[styles.row, styles.center]}>
                      <Text style={styles.info}>{"Req:         "}</Text>
                      <Text style={styles.info2}>
                        {item.ApprovalRequestSentTo.join(", ")}
                      </Text>
                    </View>

                    {approvalPerformed.length !== 0 && (
                      <View style={[styles.row, styles.center]}>
                        <Text style={styles.info}>{"Aprob:     "}</Text>
                        <Text style={styles.info2}>
                          {item.ApprovalPerformed.join(", ")}
                        </Text>
                      </View>
                    )}

                    {RejectionPerformed.length !== 0 && (
                      <View style={[styles.row, styles.center]}>
                        <Text style={styles.info5}>{"Desap:     "}</Text>
                        <Text style={styles.info6}>
                          {item.RejectionPerformed.join(", ")}
                        </Text>
                      </View>
                    )}

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      {isIncludedapprovalRequested &&
                        !(
                          isIncludedapprovalPerformed ||
                          isIncludedRectionPerformed
                        ) && (
                          <>
                            <Button
                              title="Aprobar"
                              buttonStyle={styles.btnActualizarStyles}
                              onPress={() =>
                                docAprovals(
                                  emailUser,
                                  approvalPerformed,
                                  idApproval
                                )
                              }
                            />

                            <Button
                              title="Desaprobar "
                              buttonStyle={styles.btncerrarStyles}
                              onPress={() =>
                                docRejection(
                                  emailUser,
                                  RejectionPerformed,
                                  idApproval
                                )
                              }
                            />
                          </>
                        )}
                    </View>
                    <Text></Text>
                  </View>
                </View>
              </View>
            </View>
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
  update_approvalList,
  saveApprovalListnew,
})(DocstoApproveScreenBare);
