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
import { areaLists } from "../../../utils/areaList";

function InformationScreen(props) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  console.log("oaaaa", props.actualServiceAIT);

  // retrieving data from formik forms ,data from ./InfomartionScreen.data.js
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const newData = formValue;

        //create the algoritm to have the date format of the post
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
        newData.fechaPostFormato = formattedDate;

        // send profile information
        newData.emailPerfil = props.email || "Anonimo";
        newData.nombrePerfil = props.firebase_user_name || "Anonimo";
        newData.fotoUsuarioPerfil = props.user_photo;

        // upload the photo or an pickimage to firebase Storage
        const snapshot = await uploadImage(props.savePhotoUri);
        const imagePath = snapshot.metadata.fullPath;
        const imageUrl = await getDownloadURL(ref(getStorage(), imagePath));

        //upload pdf file to firebase Storage

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
        newData.createdAt = new Date();
        newData.likes = [];
        newData.comentariosUsuarios = [];

        // newData.equipoPostDatos = props.actualEquipment;
        // newData.equipoTag = props.actualEquipment.tag;
        // newData.equipoNombre = props.actualEquipment.nombre;
        // newData.claseEquipo = props.actualEquipment.clase;

        //Uploading data to Firebase and adding the ID firestore
        const docRef = await addDoc(collection(db, "events"), newData);
        newData.idDocFirestoreDB = docRef.id;
        const RefFirebase = doc(db, "events", newData.idDocFirestoreDB);
        await updateDoc(RefFirebase, newData);

        //Updating global State redux
        props.saveActualPostFirebase(newData);
        //once all data is uploaded to firebase , go to homescreen

        navigation.navigate(screen.post.post); // this hedlps to go to the begining of the process
        navigation.navigate(screen.home.tab, {
          screen: screen.home.home,
        });
        alert("Se ha subido correctamente");
      } catch (error) {
        alert(error);
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

  //algorith to retrieve image source that
  const area = props.actualServiceAIT?.AreaServicio;
  const indexareaList = areaLists.findIndex((item) => item.value === area);
  const imageSource = areaLists[indexareaList]?.image;

  return (
    <KeyboardAwareScrollView>
      <View style={styles.equipments}>
        <Avatar
          size="large"
          rounded
          containerStyle={styles.avatar}
          icon={{ type: "material", name: "person" }}
          source={imageSource}
        ></Avatar>

        <View>
          <Text></Text>
          <Text style={styles.name}>
            {props.actualServiceAIT?.NombreServicio || "Titulo del Evento"}
          </Text>
          <Text style={styles.info}>
            {"Area: "}
            {props.actualServiceAIT?.AreaServicio}
          </Text>
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
        title="Agregar Evento"
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

    firebase_user_name: reducers.profile.firebase_user_name,
    user_photo: reducers.profile.user_photo,
    email: reducers.profile.email,
    profile: reducers.profile.profile,
    uid: reducers.profile.uid,

    actualServiceAIT: reducers.post.actualServiceAIT,
  };
};

export const ConnectedInformationScreen = connect(mapStateToProps, {
  saveActualPostFirebase,
})(InformationScreen);
