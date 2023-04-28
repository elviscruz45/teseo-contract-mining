import {
  View,
  Text,
  Modal,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { styles } from "./PostScreen.styles";
import * as ImagePicker from "expo-image-picker";

function PostScreen() {
  const [photos, setPhotos] = useState([]);

  const pickImage = async () => {
    console.log("Nuevo pick Image");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      console.log("Upload Image");
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => pickImage()}>
        <View style={styles.containerPost}>
          <Image
            source={require("../../../../assets/AddImage.png")}
            style={styles.roundImageUpload}
          />
          <Text>Sube un Imagen de tu Celular</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => pickImage()}>
        <View style={styles.containerPost}>
          <Image
            source={require("../../../../assets/TakePhoto2.png")}
            style={styles.roundImageUpload}
          />
          <Text>Toma una foto</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const mapStateToProps = (reducers) => {
  return {
    // count: reducers.reducer1.count,
    // user_login: reducers.user.user_login,
    // upload_post: reducers.post.description,
    // photo_uri: reducers.post.photo_uri,
    // bio: reducers.user.bio,
    // email: reducers.user.email,
    // uid: reducers.user.uid,
    // photo_uuid: reducers.post.photo_uuid,
    // location: reducers.post.location,
    // likes: reducers.post.likes,
    // comments: reducers.comments.comments,
  };
};

export const ConnectedPostScreen = connect(mapStateToProps, {
  // add1,
  // subtract1,
  // logout,
  // post,
  // uploadPost,
  // getPosts,
  // likePost,
  // unlikePost,
  // actualCommentId,
  // actualPostDescription,
})(PostScreen);

{
  /* <View style={styles.container}>
<View>
  <TouchableOpacity onPress={() => pickImage()}>
    <View style={styles.containerPost}>
      <Text>Click here to upload an Images</Text>
    </View>
  </TouchableOpacity>
</View>
</View> */
}
