import React, { useEffect, useState, useCallback } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Linking,
  TextInput,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { connect } from "react-redux";
import { Icon } from "@rneui/themed";
import { styles } from "./CommentScreen.styles";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../../utils";
import { saveActualPostFirebase } from "../../../actions/post";
import { LoadingSpinner } from "../../../components/shared/LoadingSpinner/LoadingSpinner";
import { useNavigation } from "@react-navigation/native";
import { Image as ImageExpo } from "expo-image";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { screen } from "../../../utils";

function CommentScreen(props) {
  const [postsComments, setPostsComments] = useState([]);
  const [comment, setComment] = useState("");
  const navigation = useNavigation();
  const {
    route: {
      params: { Item },
    },
  } = props;

  useEffect(() => {
    const docRef = doc(db, "events", Item.idDocFirestoreDB);

    // const docRef = doc(db, "events", "u9UoHrWiq0ZxIuH8ggsw");
    let unsubscribe = onSnapshot(docRef, (snapshot) => {
      const post_array = snapshot.data().comentariosUsuarios || [];
      setPostsComments(post_array);
    });
    return () => unsubscribe();
  }, []);

  //---This is used to get the attached file in the post that contain an attached file---
  const uploadFile = useCallback(async (uri) => {
    try {
      const supported = await Linking.canOpenURL(uri);
      if (supported) {
        await Linking.openURL(uri);
      } else {
        alert("Unable to open PDF document");
      }
    } catch (error) {
      alert("Error opening PDF document", error);
    }
  }, []);

  const handleCommentChange = (text) => {
    setComment(text);
  };

  const handleSendComment = async (comment) => {
    // Send the comment to Firebase
    // Check if the comment parameter is empty or contains only spaces
    if (comment.trim() === "") {
      return;
    }

    const PostRef = doc(db, "events", Item.idDocFirestoreDB);
    const commentObj = {
      comment: comment,
      commenterEmail: props.email,
      commenterName: props.firebase_user_name,
      commenterPhoto: props.user_photo,
      date: new Date().getTime(),
    };
    await updateDoc(PostRef, {
      comentariosUsuarios: arrayUnion(commentObj),
    });
    // Clear the comment input
    setComment("");
  };

  // goToServiceInfo
  const goToServiceInfo = () => {
    navigation.navigate(screen.search.tab, {
      screen: screen.search.item,
      params: { Item: Item.AITidServicios },
    });
  };

  //Delete function
  const docDelete = async (idDoc) => {
    Alert.alert(
      "Eliminar Evento",
      "Estas Seguro que desear Eliminar el evento?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Aceptar",
          onPress: async () => {
            //delete the doc from events collections
            navigation.navigate(screen.home.home);
            await deleteDoc(doc(db, "events", idDoc));

            //updating events in ServiciosAIT to filter the deleted event
            const Ref = doc(db, "ServiciosAIT", Item?.idDocAITFirestoreDB);
            const docSnapshot = await getDoc(Ref);
            const eventList = docSnapshot.data().events;

            const filteredList = eventList.filter(
              (obj) => obj.idDocFirestoreDB !== Item.idDocFirestoreDB
            );

            const updatedData = {
              events: filteredList,
            };

            await updateDoc(Ref, updatedData);
          },
        },
      ],
      { cancelable: false }
    );
  };

  if (!postsComments) {
    return <LoadingSpinner />;
  } else {
    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: "white" }} // Add backgroundColor here
        showsVerticalScrollIndicator={false}

        // contentContainerStyle={{ flexGrow: 1 }} // Allow the content to grow inside the ScrollView
        // keyboardShouldPersistTaps="handled" // Ensure taps are handled when the keyboard is open
      >
        <Text></Text>
        <Text></Text>

        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <Text
            style={{
              color: "black",
              fontWeight: "700",
              textAlign: "center",
              // alignSelf: "center",
              fontSize: 20,
              paddingHorizontal: 30,
            }}
            onPress={() => goToServiceInfo()}
          >
            {Item?.AITNombreServicio}
          </Text>

          {/* <Text></Text> */}
        </View>
        <Text></Text>
        {props.email === Item?.emailPerfil && (
          <TouchableOpacity
            onPress={() => docDelete(Item.idDocFirestoreDB)}
            style={{
              marginRight: 15,
            }}
          >
            <ImageExpo
              source={require("../../../../assets/deleteIcon.png")}
              style={styles.roundImage10}
              cachePolicy={"memory-disk"}
            />
          </TouchableOpacity>
        )}

        <Text></Text>

        <ImageExpo
          source={{ uri: Item?.fotoPrincipal }}
          style={styles.postPhoto}
          cachePolicy={"memory-disk"}
        />
        <Text></Text>
        <Text></Text>
        <Text
          style={{
            // color: "black",
            fontWeight: "700",
            // alignSelf: "center",
            // fontSize: 20,
            paddingHorizontal: 5,
          }}
        >
          {Item?.titulo}
        </Text>
        <Text></Text>
        <Text
          style={{
            // color: "black",
            // fontWeight: "700",
            // alignSelf: "center",
            // fontSize: 20,
            paddingHorizontal: 5,
          }}
        >
          {Item?.comentarios}
        </Text>
        <Text></Text>

        <View style={[styles.row5, styles.center]}>
          {Item?.pdfPrincipal && (
            <>
              <Text style={{ fontWeight: "bold", alignSelf: "center" }}>
                {" "}
                Archivo Adjunto:
              </Text>
              <TouchableOpacity
                onPress={() => uploadFile(Item.pdfPrincipal)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 60,
                }}
              >
                <Icon type="material-community" name="paperclip" />
                <Text>Pdf</Text>
              </TouchableOpacity>
            </>
          )}

          <Text style={{ margin: 5, color: "#5B5B5B" }}>
            {"Fecha:  "}
            {Item?.fechaPostFormato}
          </Text>
        </View>
        <Text></Text>

        <View style={styles.commentContainer}>
          <ImageExpo
            source={{ uri: props.user_photo }}
            style={styles.roundImage}
            cachePolicy={"memory-disk"}
          />
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu comentario"
            value={comment}
            onChangeText={handleCommentChange}
          />
          <TouchableOpacity
            onPress={() => handleSendComment(comment)}
            style={styles.sendButton}
          >
            <Feather name="send" size={16} color="white" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={postsComments}
          scrollEnabled={false}
          renderItem={({ item, index }) => {
            const options = {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: false,
            };

            return (
              <View style={{ paddingHorizontal: 10 }}>
                <Text></Text>
                <View style={[styles.row, styles.center]}>
                  <View style={[styles.row, styles.center]}>
                    <ImageExpo
                      source={{
                        uri: item?.commenterPhoto,
                      }}
                      style={styles.roundImage}
                      cachePolicy={"memory-disk"}
                    />
                    <Text style={styles.center2}>{item.commenterName}</Text>
                  </View>

                  <Text style={styles.center2}>
                    {new Date(item.date).toLocaleString(undefined, options)}
                  </Text>
                </View>
                <Text></Text>
                <View style={styles.center3}>
                  <Text style={styles.center4}>{item.comment}</Text>
                </View>
              </View>
            );
          }}
        />
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = (reducers) => {
  return {
    firebase_user_name: reducers.profile.firebase_user_name,
    user_photo: reducers.profile.user_photo,
    email: reducers.profile.email,
    totalEventServiceAITLIST: reducers.home.totalEventServiceAITLIST,
  };
};

export const ConnectedCommentScreen = connect(mapStateToProps, {
  saveActualPostFirebase,
})(CommentScreen);
