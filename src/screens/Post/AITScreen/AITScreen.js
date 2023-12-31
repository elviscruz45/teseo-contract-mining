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
import { styles } from "./AITScreen.styles";
import { GeneralForms } from "../../../components/Forms/GeneralForms/GeneralForms/GeneralForms";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { initialValues, validationSchema } from "./AITScreen.data";
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
import { AITForms } from "../../../components/Forms/GeneralForms/AITForms/AITForms";
import { areaLists } from "../../../utils/areaList";

function AITNoReduxScreen(props) {
  const emptyimage = require("../../../../assets/splash.png");

  const navigation = useNavigation();
  const [tituloserv, setTituloserv] = useState();
  const [ait, setAit] = useState();
  const [tiposerv, setTiposerv] = useState();
  const [area, setArea] = useState();

  // find Index of areaList array where there is the image of the area to render the icon Avatar
  const IndexObjectImageArea = areaLists.findIndex((obj) => obj.value === area);
  const imageSource = areaLists[IndexObjectImageArea]?.image || emptyimage;

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        //retrieving data from Formik
        const newData = formValue;

        //Data about date time format
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
        newData.fechaPostISO = new Date().toISOString();
        newData.createdAt = new Date();

        //Data about information profile and company
        newData.emailPerfil = props.email || "Anonimo";
        newData.nombrePerfil = props.firebase_user_name || "Anonimo";

        //Data about the company belong this event
        const regex = /@(.+?)\./i;
        newData.companyName = props.email?.match(regex)?.[1] || "Anonimo";
        //Progress of Service
        newData.AvanceEjecucion = 0;
        newData.AvanceAdministrativo = 0;
        //Uploading data to Firebase
        const docRef = await addDoc(collection(db, "ServiciosAIT"), newData);
        newData.idServiciosAIT = docRef.id;
        const RefFirebase = doc(db, "ServiciosAIT", newData.idServiciosAIT);
        await updateDoc(RefFirebase, newData);

        // this hedlps to go to the begining of the process
        navigation.navigate(screen.post.post);
        // navigation.navigate(screen.home.tab, {
        //   screen: screen.home.home,
        // });
        console.log(newData);
        alert("Se ha subido correctamente");
      } catch (error) {
        alert(error);
      }
    },
  });

  return (
    <KeyboardAwareScrollView>
      <View style={styles.sectionForms}>
        <Avatar
          size="large"
          rounded
          containerStyle={styles.avatar}
          icon={{ type: "material", name: "person" }}
          source={imageSource}
        ></Avatar>

        <View>
          <Text style={styles.name}>{tituloserv || "Titulo del servicio"}</Text>
          <Text style={styles.info}>
            {"AIT: "}
            {ait}
          </Text>
          <Text style={styles.info}>
            {"Tipo Servicio: "}
            {tiposerv}
          </Text>

          <Text style={styles.info}>
            {"Area: "}
            {area}
          </Text>
        </View>
      </View>
      <View style={styles.sectionForms}></View>

      <AITForms
        formik={formik}
        setTituloserv={setTituloserv}
        setAit={setAit}
        setTiposerv={setTiposerv}
        setArea={setArea}
      />
      <Button
        title="Agregar AIT"
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
  };
};

export const AITScreen = connect(mapStateToProps, {
  saveActualPostFirebase,
})(AITNoReduxScreen);
