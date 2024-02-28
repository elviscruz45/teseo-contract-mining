import { View, Text } from "react-native";
import { Icon, Avatar, Input, Button } from "@rneui/themed";
import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { styles } from "./AITScreen.styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { initialValues, validationSchema } from "./AITScreen.data";
import { saveActualPostFirebase } from "../../../actions/post";
import { useFormik } from "formik";
import { db } from "../../../utils";
import {
  addDoc,
  collection,
  query,
  doc,
  updateDoc,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { AITForms } from "../../../components/Forms/GeneralForms/AITForms/AITForms";
import { areaLists } from "../../../utils/areaList";
import { saveTotalUsers } from "../../../actions/post";
import Toast from "react-native-toast-message";
import { Image as ImageExpo } from "expo-image";

function AITNoReduxScreen(props) {
  const emptyimage = require("../../../../assets/splash.png");
  const navigation = useNavigation();
  const [tituloserv, setTituloserv] = useState();
  const [ait, setAit] = useState();
  const [tiposerv, setTiposerv] = useState();
  const [area, setArea] = useState();

  //fetching data from firebase to retrieve all users

  useEffect(() => {
    // Function to fetch data from Firestore
    if (props.email) {
      const companyName = props.email?.match(/@(.+?)\./i)?.[1] || "Anonimo";
      async function fetchData() {
        try {
          const queryRef1 = query(
            collection(db, "users"),
            where("companyName", "==", "fmi"),
            orderBy("email", "desc")
          );

          const queryRef2 = query(
            collection(db, "users"),
            where("companyName", "==", companyName),
            orderBy("email", "desc")
          );

          const getDocs1 = await getDocs(queryRef1);
          const getDocs2 =
            companyName !== "fmi" ? await getDocs(queryRef2) : null;

          const lista = [];

          // Process results from the first query
          if (getDocs1) {
            getDocs1.forEach((doc) => {
              lista.push(doc.data());
            });
          }

          // Process results from the second query
          if (getDocs2) {
            getDocs2.forEach((doc) => {
              lista.push(doc.data());
            });
          }

          // Save the merged results to the state or do any other necessary operations
          props.saveTotalUsers(lista);
        } catch (error) {
          console.error("Error fetching data:", error);
          // Handle the error as needed
        }
      }
      // Call the fetchData function when the component mounts

      if (!props.getTotalUsers) {
        fetchData();
      }
    }
  }, [props.email]);

  // find Index of areaList array where there is the image of the area to render the icon Avatar
  const IndexObjectImageArea = areaLists.findIndex((obj) => obj.value === area);
  const imageSource = areaLists[IndexObjectImageArea]?.image || emptyimage;
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

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
        newData.LastEventPosted = new Date();
        newData.NuevaFechaEstimada = 0;
        newData.fechaFinEjecucion = 0;

        //Photo of the service
        newData.photoServiceURL = "";
        //Data about information profile and company
        newData.emailPerfil = props.email || "Anonimo";
        newData.nombrePerfil = props.firebase_user_name || "Anonimo";

        //Data gattered from events
        newData.events = [];

        //Data about the company belong this event
        const regex = /@(.+?)\./i;
        newData.companyName =
          capitalizeFirstLetter(props.email?.match(regex)?.[1]) || "Anonimo";
        //Progress of Service
        newData.AvanceEjecucion = 1;
        // newData.AvanceAdministrativo = 0;
        newData.AvanceAdministrativoTexto = "";
        //Monto and HH updated in the proccess of the service
        newData.HHModificado = 0;
        newData.MontoModificado = 0;

        //Uploading data to Firebase and adding the ID firestore

        const docRef = await addDoc(collection(db, "ServiciosAIT"), newData);
        newData.idServiciosAIT = docRef.id;
        const RefFirebase = doc(db, "ServiciosAIT", newData.idServiciosAIT);
        await updateDoc(RefFirebase, newData);

        // this hedlps to go to the begining of the process
        navigation.navigate(screen.post.post);
        // navigation.navigate(screen.home.tab, {
        //   screen: screen.home.home,
        // });
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Se ha subido correctamente",
        });
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al tratar de subir estos datos",
        });
      }
    },
  });

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: "white" }} // Add backgroundColor here
    >
      <View style={styles.sectionForms}>
        <ImageExpo
          source={imageSource}
          style={styles.roundImage}
          cachePolicy={"memory-disk"}
        />

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
    firebase_user_name: reducers.profile.firebase_user_name,
    email: reducers.profile.email,
    getTotalUsers: reducers.post.saveTotalUsers,
  };
};

export const AITScreen = connect(mapStateToProps, {
  saveActualPostFirebase,
  saveTotalUsers,
})(AITNoReduxScreen);
