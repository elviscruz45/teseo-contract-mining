import React, { useEffect, useState } from "react";
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import { Icon } from "@rneui/themed";
import { styles } from "./CommentScreen.styles";
import { equipmentList } from "../../../utils/equipmentList";
import {
  collection,
  onSnapshot,
  query,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../../../utils";
import { saveActualPostFirebase } from "../../../actions/post";
import { LoadingSpinner } from "../../../components/shared/LoadingSpinner/LoadingSpinner";
import { screen } from "../../../utils";
import { useNavigation } from "@react-navigation/native";
import { Image as ImageExpo } from "expo-image";

const windowWidth = Dimensions.get("window").width;

function CommentScreen(props) {
  const [posts2, setPosts2] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const [comment, setComment] = useState("");

  const navigation = useNavigation();
  const {
    route: {
      params: { Item },
    },
  } = props;

  useEffect(() => {
    async function fetchData() {
      // Try to retrieve data from AsyncStorage
      const q = doc(db, "posts", Item.idDocFirestoreDB);
      onSnapshot(q, (docSnapshot) => {
        const data = docSnapshot.data()?.comentariosUsuarios;
        setPosts2(data);
      });
      setIsLoading(false);
    }
    fetchData();
  }, []);

  function chooseImageEquipment(tags) {
    const result = equipmentList.find((item) => {
      return item.tag == tags;
    });

    return result.image;
  }

  async function UploadFile(uri) {
    Linking.canOpenURL(uri)
      .then((supported) => {
        if (supported) {
          Linking.openURL(uri);
        } else {
          alert("Unable to open PDF document");
        }
      })
      .catch((error) => alert("Error opening PDF document", error));
  }

  const handleCommentChange = (text) => {
    setComment(text);
  };

  const handleSendComment = async (comment) => {
    // Send the comment to Firebase
    const PostRef = doc(db, "posts", Item.idDocFirestoreDB);
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

  if (isLoading) {
    return <LoadingSpinner />;
  } else {
    return (
      <>
        <ImageExpo
          source={{ uri: Item.fotoPrincipal }}
          style={styles.postPhoto}
          cachePolicy={"memory-disk"}
        />

        <View style={[styles.row, styles.center]}>
          <Text style={{ margin: 5, color: "#5B5B5B" }}>
            {"Fecha:  "}
            {Item.fechaPostFormato}
          </Text>
          {Item.pdfPrincipal && (
            <TouchableOpacity onPress={() => UploadFile(Item.pdfPrincipal)}>
              <Icon type="material-community" name="paperclip" />
              <Text>Archivo Adjunto</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.commentContainer}>
          <ImageExpo
            source={{ uri: Item.fotoUsuarioPerfil }}
            style={styles.roundImage}
            cachePolicy={"memory-disk"}
          />
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu comentario"
            value={comment}
            onChangeText={handleCommentChange}
            onSubmitEditing={() => handleSendComment(comment)}
          />
          <TouchableOpacity
            onPress={() => handleSendComment(comment)}
            style={styles.sendButton}
          >
            <Feather name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={posts2}
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
              <View
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor: "#8CBBF1",
                  margin: 2,
                }}
              >
                <View style={[styles.row, styles.center]}>
                  <View style={[styles.row, styles.center]}>
                    <ImageExpo
                      source={{
                        uri: item?.commenterPhoto,
                      }}
                      style={styles.roundImage}
                      cachePolicy={"memory-disk"}
                    />
                    <Text>{item.commenterName}</Text>
                  </View>

                  <Text>
                    {new Date(item.date).toLocaleString(undefined, options)}
                  </Text>
                </View>
                <Text>{item.comment}</Text>

                <View style={styles.equipments}></View>
                <View style={styles.rowlikes}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginRight: windowWidth * 0.35,
                    }}
                  ></View>
                </View>
                <Text>{item.comment}</Text>
              </View>
            );
          }}
        />
      </>
    );
  }
}

const mapStateToProps = (reducers) => {
  return {
    ActualPostFirebase: reducers.post.ActualPostFirebase,
    firebase_user_name: reducers.profile.firebase_user_name,
    user_photo: reducers.profile.user_photo,
    email: reducers.profile.email,
    profile: reducers.profile.profile,
    uid: reducers.profile.uid,
  };
};

export const ConnectedCommentScreen = connect(mapStateToProps, {
  saveActualPostFirebase,
})(CommentScreen);
