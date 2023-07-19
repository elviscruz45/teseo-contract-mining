import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import { Camera, CameraType } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";
import { styles, styles2 } from "./CameraScreen.styles";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { savePhotoUri } from "../../../actions/post";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";

function CameraScreen(props) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const navigation = useNavigation();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }
  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          Necesitamos tu permiso para usar la camara
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  async function snapPhoto() {
    if (cameraRef.current) {
      const options = { quality: 1, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);

      const resizedPhoto = await ImageManipulator.manipulateAsync(
        data.uri,
        [{ resize: { width: 800 } }],
        { compress: 0.2, format: "jpeg", base64: true }
      );
      props.savePhotoUri(resizedPhoto.uri);
      navigation.navigate(screen.post.form);
    }
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View style={styles2.container}>
      <Camera style={styles2.camera} type={type} ref={cameraRef}>
        <View style={styles2.buttonContainer}>
          <TouchableOpacity style={styles2.button} onPress={toggleCameraType}>
            <Ionicons name="camera-reverse-sharp" size={35} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cameraButton}
            onPress={() => snapPhoto()}
          >
            <View
              style={{
                borderWidth: 2,
                borderRadius: 30,
                borderColor: "white",
                height: 50,
                width: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 30,
                  borderColor: "white",
                  height: 40,
                  width: 40,
                  backgroundColor: "white",
                }}
              ></View>
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const mapStateToProps = (reducers) => {
  return reducers.post;
};

export const ConnectedCameraScreen = connect(mapStateToProps, {
  savePhotoUri,
})(CameraScreen);
