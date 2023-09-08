import { View, Text } from "react-native";
import { Icon, Avatar, Input, Button } from "@rneui/themed";
import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { styles } from "./EditAITScreen.styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { initialValues, validationSchema } from "./EditAITScreen.data";
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

function EditAITNoReduxScreen(props) {
  const emptyimage = require("../../../../assets/splash.png");
  const navigation = useNavigation();
  const [tituloserv, setTituloserv] = useState();
  const [ait, setAit] = useState();
  const [tiposerv, setTiposerv] = useState();
  const [area, setArea] = useState();
  //Retrieve data Item that comes from the previous screen to render the Updated Status

  const {
    route: {
      params: { Item },
    },
  } = props;

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

  const formik = useFormik({
    initialValues: initialValues(),
    // validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        //retrieving data from Formik
        const newData = formValue;

        //Modifying the Service State ServiciosAIT considering the LasEventPost events
        const RefFirebaseLasEventPostd = doc(
          db,
          "ServiciosAIT",
          Item.idServiciosAIT
        );
        const updateDataLasEventPost = {};

        if (newData?.NombreServicio) {
          updateDataLasEventPost.NombreServicio = newData.NombreServicio;
        }
        if (newData?.NumeroAIT) {
          updateDataLasEventPost.NumeroAIT = newData.NumeroAIT;
        }
        if (newData?.AreaServicio) {
          updateDataLasEventPost.AreaServicio = newData.AreaServicio;
        }
        if (newData?.TipoServicio) {
          updateDataLasEventPost.TipoServicio = newData.TipoServicio;
        }
        if (newData?.ResponsableEmpresaUsuario) {
          updateDataLasEventPost.ResponsableEmpresaUsuario =
            newData.ResponsableEmpresaUsuario;
        }
        if (newData?.ResponsableEmpresaUsuario2) {
          updateDataLasEventPost.ResponsableEmpresaUsuario2 =
            newData.ResponsableEmpresaUsuario2;
        }
        if (newData?.ResponsableEmpresaUsuario3) {
          updateDataLasEventPost.ResponsableEmpresaUsuario3 =
            newData.ResponsableEmpresaUsuario3;
        }
        if (newData?.ResponsableEmpresaContratista) {
          updateDataLasEventPost.ResponsableEmpresaContratista =
            newData.ResponsableEmpresaContratista;
        }
        if (newData?.ResponsableEmpresaContratista2) {
          updateDataLasEventPost.ResponsableEmpresaContratista2 =
            newData.ResponsableEmpresaContratista2;
        }
        if (newData?.ResponsableEmpresaContratista3) {
          updateDataLasEventPost.ResponsableEmpresaContratista3 =
            newData.ResponsableEmpresaContratista3;
        }
        if (newData?.FechaInicio) {
          updateDataLasEventPost.FechaInicio = newData.FechaInicio;
        }
        if (newData?.FechaFin) {
          updateDataLasEventPost.FechaFin = newData.FechaFin;
        }
        if (newData?.NumeroCotizacion) {
          updateDataLasEventPost.NumeroCotizacion = newData.NumeroCotizacion;
        }
        if (newData?.Moneda) {
          updateDataLasEventPost.Moneda = newData.Moneda;
        }
        if (newData?.Monto) {
          updateDataLasEventPost.Monto = newData.Monto;
        }

        if (newData?.HorasHombre) {
          updateDataLasEventPost.HorasHombre = newData.HorasHombre;
        }

        console.log("updateDataLasEventPost", updateDataLasEventPost);
        await updateDoc(RefFirebaseLasEventPostd, updateDataLasEventPost);

        // this hedlps to go to the begining of the process
        navigation.navigate(screen.search.search);
        navigation.navigate(screen.home.home);

        alert("Se ha Actualizado correctamente");
      } catch (error) {
        alert(error);
      }
    },
  });

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: "white" }} // Add backgroundColor here
    >
      <Text></Text>
      <View style={{ alignSelf: "center" }}>
        <Text style={styles.name}>{tituloserv || Item.NombreServicio}</Text>
        <Text style={styles.info}>
          {"Numero Servicio: "}
          {ait || Item.NumeroAIT}
        </Text>
        <Text style={styles.info}>
          {"Tipo Servicio: "}
          {tiposerv || Item.TipoServicio}
        </Text>

        <Text style={styles.info}>
          {"Area: "}
          {area || Item.AreaServicio}
        </Text>
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
        title="Actualizar AIT"
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

export const EditAITScreen = connect(mapStateToProps, {
  saveActualPostFirebase,
  saveTotalUsers,
})(EditAITNoReduxScreen);
