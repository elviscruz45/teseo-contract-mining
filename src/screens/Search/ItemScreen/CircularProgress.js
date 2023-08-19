import React, { useState } from "react";
import { VictoryPie, VictoryLabel, VictoryAnimation } from "victory-native";
import { Avatar, Icon } from "@rneui/themed";
import Svg from "react-native-svg";
import { View, Text } from "react-native";
import { Image as ImageExpo } from "expo-image";

import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../../utils";

export const CircularProgress = ({
  imageSourceDefault,
  imageStyle,
  avance,
  id,
  image,
  titulo,
}) => {
  const [avatar, setAvatar] = useState();

  console.log("CircularProgress");
  console.log(titulo);
  console.log(avatar);
  console.log("imageSourceDefault..", imageSourceDefault);
  console.log("image..", image);

  const data = [
    { x: 1, y: parseInt(avance) },
    { x: 2, y: 100 - parseInt(avance) },
  ];

  const changeAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled) uploadImage(result.uri);
  };

  const uploadImage = async (uri) => {
    // setLoadingText("Actualizando Avatar");
    // setLoading(true);

    const response = await fetch(uri);
    const blob = await response.blob();

    const storage = getStorage();
    const storageRef = ref(storage, `Serviceavatar/${id}`);

    uploadBytes(storageRef, blob).then((snapshot) => {
      updatePhotoUrl(snapshot.metadata.fullPath);
    });
  };

  const updatePhotoUrl = async (imagePath) => {
    const storage = getStorage();
    const imageRef = ref(storage, imagePath);
    const imageUrl = await getDownloadURL(imageRef);
    const RefFirebaseServiceAIT = doc(db, "ServiciosAIT", id);
    console.log("imageUrl");

    console.log(imageUrl);

    const updateDataLasEventPost = {
      photoServiceURL: imageUrl,
    };
    await updateDoc(RefFirebaseServiceAIT, updateDataLasEventPost);
    console.log("Exito");

    setAvatar(imageUrl);

    // props.update_firebasePhoto(imageUrl);
    // setLoading(false);
  };

  return (
    <>
      <Svg
        style={{ position: "absolute", top: -41, left: -45, zIndex: -100 }}
        width="300%"
        height="300%"
      >
        <VictoryPie
          standalone={false}
          // animate={{ duration: 1000 }}
          width={210}
          height={210}
          data={data}
          innerRadius={50}
          // cornerRadius={80}
          labels={() => null}
          style={{
            data: {
              fill: ({ datum }) => {
                const color =
                  datum.y < 20
                    ? "limegreen"
                    : datum.y < 40
                    ? "limegreen"
                    : datum.y < 60
                    ? "limegreen"
                    : datum.y < 80
                    ? "limegreen"
                    : datum.y < 100
                    ? "green"
                    : "blue";
                return datum.x === 1 ? color : "transparent";
              },
            },
          }}
        />
      </Svg>
      <Avatar
        style={{
          zIndex: 10,
          position: "absolute",
          margin: 115,
        }}
      >
        <Avatar.Accessory
          size={30}
          onPress={changeAvatar}
          containerStyle={
            {
              // zIndex: 10
              // width: 80,
              // height: 80,
              // borderRadius: 65,
              // borderRadius: 60,
              // marginRight: 20,
              // backgroundColor: "green",
            }
          }
        />
      </Avatar>
      {avatar ? (
        <ImageExpo
          source={{ uri: avatar }}
          style={{
            marginLeft: 10,
            width: 100,
            height: 100,
            borderRadius: 80,
          }}
        />
      ) : image ? (
        <ImageExpo
          source={{ uri: image }}
          style={{
            marginLeft: 10,
            width: 100,
            height: 100,
            borderRadius: 80,
          }}
        />
      ) : (
        <ImageExpo
          source={imageSourceDefault}
          style={{
            marginLeft: 10,
            width: 100,
            height: 100,
            borderRadius: 80,
          }}
        />
      )}
    </>
  );
};
