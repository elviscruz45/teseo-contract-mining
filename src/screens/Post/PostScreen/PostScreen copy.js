import {
  View,
  Text,
  Modal,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { styles } from "./PostScreen.styles";
import * as ImagePicker from "expo-image-picker";

function PostScreen() {
  const [photos, setPhotos] = useState([]);

  // state = {
  //   showModal: false,
  //   image: null,
  // };
  // const setLocation = (location) => {
  //   this.setState({ ...this.state, showModal: false });
  //   // this.props.photo_location(location);
  // };
  const pickImage = async () => {
    console.log("Nuevo pick Image");
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      console.log("Upload Image");
      // this.setState({ ...this.state, image: result.assets[0].uri });
      // this.setState({ ...this.state, image: result.assets[0].uri });
      // console.log(this.state);
      // console.log(this.props);
    }
  };
  useEffect(() => pickImage(), []);

  const uploadPost1 = async () => {
    const {
      user_login,
      upload_post,
      bio,
      email,
      uid,
      photo_uri,
      photo_uuid,
      likes,
      comments,
    } = this.props;
    const upload = {
      postPhoto: this.state.image,
      postDescription: upload_post,
      bio: bio,
      uid: uid,
      photo: "download url",
      username: user_login,
      email: email,
      photo_uuid: photo_uuid,
      likes: likes,
      comments: comments,
    };
    await this.props.uploadPost_Photo(upload);
    await this.props.getPosts();
    this.props.navigation.navigate("Home");
  };

  return (
    <View>
      <Text>hola</Text>
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
