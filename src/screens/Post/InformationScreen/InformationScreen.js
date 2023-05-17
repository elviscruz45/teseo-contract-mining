import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Aler,
  ImageBackground,
  Image,
} from "react-native";
import { Icon, Avatar, Input, Button } from "@rneui/themed";
import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import { styles } from "./InformationScreen.styles";
import { GeneralForms } from "../../../components/Forms/GeneralForms/GeneralForms/GeneralForms";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { initialValues, validationSchema } from "./InformationScreen.data";
import { saveActualPostFirebase } from "../../../actions/post";
import { useFormik } from "formik";
import { getAuth, updateProfile } from "firebase/auth";
import { db } from "../../../utils";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { equipmentList } from "../../../utils/equipmentList";

function InformationScreen(props) {
  const navigation = useNavigation();
  const { photoURL, displayName, email } = getAuth().currentUser;
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const newData = formValue;
        const date = new Date();
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
        newData.emailPerfil = email || "Anonimo";
        newData.nombrePerfil = displayName || "Anonimo";
        newData.fechaPostFormato = formattedDate;
        newData.fotoUsuarioPerfil = photoURL;

        // subiendo la foto o pickimage a firebase Storage y obteniendo la url imageUrl
        const snapshot = await uploadImage(props.savePhotoUri);
        const imagePath = snapshot.metadata.fullPath;
        const imageUrl = await getDownloadURL(ref(getStorage(), imagePath));

        //subir pdf a firebase Storage y obteniendo la url imageUrl

        if (formValue.pdfFile) {
          const snapshotPDF = await uploadPdf(formValue.pdfFile);
          const imagePathPDF = snapshotPDF.metadata.fullPath;
          var imageUrlPDF = await getDownloadURL(
            ref(getStorage(), imagePathPDF)
          );
        }

        //preparando datos para subir a  firestore Database
        newData.pdfPrincipal = imageUrlPDF || "";
        newData.fotoPrincipal = imageUrl;
        newData.equipoPostDatos = props.actualEquipment;
        newData.equipoTag = props.actualEquipment.tag;
        newData.fechaPostISO = new Date().toISOString();
        newData.createdAt = new Date();
        newData.likes = [];
        newData.comentariosUsuarios = [];

        //
        const docRef = await addDoc(collection(db, "posts"), newData);
        newData.idDocFirestoreDB = docRef.id;
        const RefFirebase = doc(db, "posts", newData.idDocFirestoreDB);
        await updateDoc(RefFirebase, newData);

        // yendo a Home
        // navigation.navigate(screen.home.tab, {
        //   screen: screen.home.home,
        // });

        props.saveActualPostFirebase(newData);
        navigation.navigate(screen.post.post);
        navigation.navigate(screen.home.tab, {
          screen: screen.home.home,
        });
        alert("Se ha subido correctamente");
      } catch (error) {
        alert(error);
        console.log("error");
      }
    },
  });

  const uploadPdf = async (uri) => {
    setLoading(true);
    const uuid = uuidv4();

    const response = await fetch(uri);
    const blob = await response.blob();
    const fileSize = blob.size;
    if (fileSize > 5 * 1024 * 1024) {
      throw new Error("File size exceeds 5MB");
    }
    const storage = getStorage();
    const storageRef = ref(storage, `pdfPost/${uuid}`);
    return uploadBytes(storageRef, blob);
  };

  const uploadImage = async (uri) => {
    setLoading(true);
    const uuid = uuidv4();

    const response = await fetch(uri);
    const blob = await response.blob();

    const storage = getStorage();
    const storageRef = ref(storage, `mainImagePost/${uuid}`);
    return uploadBytes(storageRef, blob);
  };

  const goToPolines = () => {
    navigation.navigate(screen.post.polines);
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.equipments}>
        <Avatar
          size="large"
          rounded
          containerStyle={styles.avatar}
          icon={{ type: "material", name: "person" }}
          source={props.actualEquipment?.image}
        ></Avatar>
        {props.actualEquipment.clase == "faja" && (
          <Icon
            reverse
            type="material-community"
            name="plus"
            color="#8CBBF1"
            containerStyle={styles.btnContainer2}
            onPress={goToPolines}
          />
        )}
        <View>
          <Text></Text>
          <Text style={styles.name}>
            {props.actualEquipment?.tag || "Vuelve al Inicio"}
          </Text>
          <Text style={styles.info}>{props.actualEquipment?.nombre}</Text>
        </View>
      </View>
      <View style={styles.equipments}>
        <Image
          source={{
            uri: props.savePhotoUri,
          }}
          style={styles.postPhoto}
        />
        <View>
          <Input
            placeholder="Titulo del Evento"
            onChangeText={(text) => {
              formik.setFieldValue("titulo", text);
            }}
          />
          <Input
            placeholder="Comentarios"
            multiline={true}
            inputContainerStyle={styles.textArea}
            onChangeText={(text) => {
              formik.setFieldValue("comentarios", text);
            }} // errorMessage={formik.errors.observacion}
          />
        </View>
      </View>
      <GeneralForms formik={formik} />
      <Button
        title="Agregar Dato"
        buttonStyle={styles.addInformation}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </KeyboardAwareScrollView>
  );
}

const mapStateToProps = (reducers) => {
  return {
    savePhotoUri: reducers.post.savePhotoUri,
    actualEquipment: reducers.post.actualEquipment,
    ActualPostFirebase: reducers.post.ActualPostFirebase,
  };
};

export const ConnectedInformationScreen = connect(mapStateToProps, {
  saveActualPostFirebase,
})(InformationScreen);
