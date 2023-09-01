import React, { useEffect, useState, useCallback } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Linking,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { connect } from "react-redux";
import { Icon } from "@rneui/themed";
import { styles } from "./CommentScreen.styles";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../../../utils";
import { saveActualPostFirebase } from "../../../actions/post";
import { LoadingSpinner } from "../../../components/shared/LoadingSpinner/LoadingSpinner";
import { useNavigation } from "@react-navigation/native";
import { Image as ImageExpo } from "expo-image";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { screen } from "../../../utils";

function CommentScreen(props) {
  let unsubscribe;
  const [postsComments, setPostsComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState("");

  console.log("CommentScreen");

  const navigation = useNavigation();
  const {
    route: {
      params: { Item },
    },
  } = props;

  useEffect(() => {
    // // //this retrieve data from ServiciosAIT collections from Firestore and send it ot the global redux state
    async function fetchDataEventServicesCommentsList() {
      const docRef = doc(db, "events", Item.idDocFirestoreDB);
      const docSnapshot = await getDoc(docRef);
      const post_array = docSnapshot.data().comentariosUsuarios;

      post_array.sort((a, b) => {
        return b.date - a.date;
      });

      setPostsComments(post_array);
      console.log("1.2.commentScreen", post_array);
    }
    fetchDataEventServicesCommentsList();

    setIsLoading(false);
  }, [props.totalEventServiceAITLIST]);

  //---This is used to get the attached file in the post that contain an attached file---
  const uploadFile = useCallback(async (uri) => {
    console.log("pdfHomescreen", uri);
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
      return; // Do not proceed further
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
    console.log("ITEMMMM", Item);

    console.log("tem.idServiciosAIT", Item.AITidServicios);
  };

  if (isLoading & !postsComments) {
    return <LoadingSpinner />;
  } else {
    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: "white" }} // Add backgroundColor here
        // contentContainerStyle={{ flexGrow: 1 }} // Allow the content to grow inside the ScrollView
        // keyboardShouldPersistTaps="handled" // Ensure taps are handled when the keyboard is open
      >
        <Text></Text>
        <Text
          style={{
            color: "black",
            fontWeight: "700",
            alignSelf: "center",
          }}
          onPress={() => goToServiceInfo()}
        >
          {Item?.AITNombreServicio}
        </Text>
        {/* <Text></Text> */}

        <View>
          {/* <Text style={styles.textAreaTitle}>{Item?.titulo}</Text> */}
          {/* <Text></Text>
          <Text style={styles.textAreaComment} selectable={true}>
            {Item?.comentarios}
          </Text>
          <Text></Text> */}

          {/* <Text style={styles.textAreaTitleplus}>Estado General : </Text> */}
          {/* <Text style={styles.textAreaCommentplus}>
            {"Progreso: "}

            {Item?.porcentajeAvance}
            {"%"}
          </Text> */}
          {/* <View style={{ flexDirection: "row", margin: 10 }}>
            <Text>{"Codigo Servicio:"}</Text>

            <Text style={styles.textAreaCommentplus} selectable={true}>
              {Item?.AITNumero}
            </Text>
          </View> */}
          {/* <Text style={styles.textAreaCommentplus}>
            {"Etapa: "}
            {Item?.etapa}
          </Text> */}
        </View>
        <Text></Text>

        <Text></Text>

        <ImageExpo
          source={{ uri: Item?.fotoPrincipal }}
          style={styles.postPhoto}
          cachePolicy={"memory-disk"}
        />
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
            // onSubmitEditing={() => handleSendComment(comment)}
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
              <View>
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
