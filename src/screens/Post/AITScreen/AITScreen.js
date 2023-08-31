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
  onSnapshot,
  query,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  limit,
  where,
  orderBy,
} from "firebase/firestore";
import { AITForms } from "../../../components/Forms/GeneralForms/AITForms/AITForms";
import { areaLists } from "../../../utils/areaList";
import { saveTotalUsers } from "../../../actions/post";

function AITNoReduxScreen(props) {
  const emptyimage = require("../../../../assets/splash.png");
  const navigation = useNavigation();
  const [tituloserv, setTituloserv] = useState();
  const [ait, setAit] = useState();
  const [tiposerv, setTiposerv] = useState();
  const [area, setArea] = useState();

  //fetching data from firebase to retrieve all users
  useEffect(() => {
    let unsubscribe;

    function fetchData() {
      let queryRef = query(collection(db, "users"), orderBy("email", "desc"));

      unsubscribe = onSnapshot(queryRef, (ItemFirebase) => {
        const lista = [];
        ItemFirebase.forEach((doc) => {
          lista.push(doc.data());
        });

        console.log("OnSnapshoFETCH_USERS", lista);
        props.saveTotalUsers(lista);
      });
    }

    fetchData();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

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
        newData.LastEventPosted = new Date();
        newData.NuevaFechaEstimada = new Date();
        newData.fechaFinEjecucion = new Date();

        //Photo of the service
        newData.photoServiceURL = "";
        //Data about information profile and company
        newData.emailPerfil = props.email || "Anonimo";
        newData.nombrePerfil = props.firebase_user_name || "Anonimo";

        //Data gattered from events
        newData.events = [];

        //Data about the company belong this event
        const regex = /@(.+?)\./i;
        newData.companyName = props.email?.match(regex)?.[1] || "Anonimo";
        //Progress of Service
        newData.AvanceEjecucion = 5;
        newData.AvanceAdministrativo = 0;
        newData.AvanceEjecucionTexto = "";
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
        console.log(newData);
        alert("Se ha subido correctamente");
      } catch (error) {
        alert(error);
      }
    },
  });

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: "white" }} // Add backgroundColor here
    >
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
    firebase_user_name: reducers.profile.firebase_user_name,
    email: reducers.profile.email,
  };
};

export const AITScreen = connect(mapStateToProps, {
  saveActualPostFirebase,
  saveTotalUsers,
})(AITNoReduxScreen);
