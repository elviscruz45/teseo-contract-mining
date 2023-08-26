import { View, Text } from "react-native";
import { Avatar, Button } from "@rneui/themed";
import React, { useState } from "react";
import { connect } from "react-redux";
import { styles } from "./InformationScreen.styles";
import { GeneralForms } from "../../../components/Forms/GeneralForms/GeneralForms/GeneralForms";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { initialValues, validationSchema } from "./InformationScreen.data";
import { saveActualPostFirebase } from "../../../actions/post";
import { useFormik } from "formik";
import { db } from "../../../utils";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { areaLists } from "../../../utils/areaList";
import { TitleForms } from "../../../components/Forms/GeneralForms/TitleForms/TitleForms";
import { resetPostPerPageHome } from "../../../actions/home";

function InformationScreen(props) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
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

        //manage the file updated to ask for aprovals
        let imageUrlPDF;
        if (newData.pdfFile) {
          console.log("pdf", newData.pdfFile);
          const snapshotPDF = await uploadPdf(newData.pdfFile);
          const imagePathPDF = snapshotPDF.metadata.fullPath;
          imageUrlPDF = await getDownloadURL(ref(getStorage(), imagePathPDF));

          if (newData.aprobacion) {
            //--------Uploading docs to a new collection called "aprovals" to manage doc aprovals
            if (
              newData.etapa === "Contratista-Solicitud Aprobacion Doc" ||
              newData.etapa === "Contratista-Envio Cotizacion" ||
              newData.etapa === "Contratista-Solicitud Ampliacion Servicio" ||
              newData.etapa === "Contratista-Envio EDP"
            ) {
              const regex = /(?<=\()[^)]*(?=\))/g;
              const matches = newData.aprobacion.match(regex);
              const docData = {
                solicitud: newData.etapa,
                solicitudComentario: newData.comentarios,
                etapa: newData.etapa,
                NombreServicio: props.actualServiceAIT.NombreServicio,
                IdAITService: props.actualServiceAIT.idServiciosAIT,
                fileName: newData.pdfFile.replace(/%20/g, "_").split("/").pop(),
                pdfFile: imageUrlPDF,
                tipoFile: newData.tipoFile,
                ApprovalRequestedBy: props.email,
                ApprovalRequestSentTo: matches,
                ApprovalPerformed: [],
                RejectionPerformed: [],
                date: new Date(),
                AreaServicio: props.actualServiceAIT.AreaServicio,
                photoServiceURL: props.actualServiceAIT.photoServiceURL,
                status: "Pendiente",
              };
              const docRef = await addDoc(collection(db, "approvals"), docData);
              docData.idApproval = docRef.id;
              const RefFirebase = doc(db, "approvals", docData.idApproval);
              await updateDoc(RefFirebase, docData);
              console.log("docDataApproval", docData);
            }
          }
        }
        newData.pdfPrincipal = imageUrlPDF || "";

        //preparing data to upload to  firestore Database
        newData.fotoPrincipal = imageUrl;
        newData.createdAt = new Date();
        newData.likes = [];
        newData.comentariosUsuarios = [];

        //-------- a default newData porcentajeAvance-------
        if (
          newData.etapa === "Usuario-Envio Solicitud Servicio" ||
          newData.etapa === "Contratista-Envio Cotizacion" ||
          newData.etapa === "Usuario-Aprobacion Cotizacion" ||
          newData.etapa === "Contratista-Inicio Servicio"
        ) {
          newData.porcentajeAvance = "0";
        }

        if (
          newData.etapa === "Contratista-Envio EDP" ||
          newData.etapa === "Usuario-Aprobacion EDP" ||
          newData.etapa === "Contratista-Registro de Pago" ||
          newData.etapa === "Contratista-Fin servicio"
        ) {
          newData.porcentajeAvance = "100";
        }
        //data of the service AIT information
        newData.AITidServicios = props.actualServiceAIT.idServiciosAIT;
        newData.AITNombreServicio = props.actualServiceAIT.NombreServicio;
        newData.AITAreaServicio = props.actualServiceAIT.AreaServicio;
        newData.AITphotoServiceURL = props.actualServiceAIT.photoServiceURL;

        // //aditional data of the service AIT information
        newData.AITAvanceEjecucion = props.actualServiceAIT.AvanceEjecucion;
        newData.AITHHModificado = props.actualServiceAIT.FechaFin;
        newData.AITHorasHombre = props.actualServiceAIT.HorasHombre;
        newData.AITLastEventPosted = props.actualServiceAIT.LastEventPosted;
        newData.AITMonto = props.actualServiceAIT.Monto;
        newData.AITMoneda = props.actualServiceAIT.Moneda;
        newData.AITMontoModificado = props.actualServiceAIT.MontoModificado;
        newData.AITNuevaFechaEstimada =
          props.actualServiceAIT.NuevaFechaEstimada;
        newData.AITNumero = props.actualServiceAIT.NumeroAIT;
        newData.AITNumeroCotizacion = props.actualServiceAIT.NumeroCotizacion;
        newData.AITResponsableEmpresaContratista =
          props.actualServiceAIT.ResponsableEmpresaContratista;
        newData.AITTipoServicio = props.actualServiceAIT.TipoServicio;
        newData.AITcompanyName = props.actualServiceAIT.companyName;
        newData.AITcreatedAt = props.actualServiceAIT.createdAt;
        newData.AITemailPerfil = props.actualServiceAIT.emailPerfil;
        newData.AITfechaPostFormato = props.actualServiceAIT.fechaPostFormato;
        newData.AITfechaPostISO = props.actualServiceAIT.fechaPostISO;
        newData.AITnombrePerfil = props.actualServiceAIT.nombrePerfil;

        //Uploading data to Firebase and adding the ID firestore
        const docRef = await addDoc(collection(db, "events"), newData);
        newData.idDocFirestoreDB = docRef.id;
        const RefFirebase = doc(db, "events", newData.idDocFirestoreDB);
        await updateDoc(RefFirebase, newData);

        /////////updating data to ServiciosAIT collection to modify its state

        //////////Modifying the LasEventPostd field,AvanceEjecucion
        const RefFirebaseLasEventPostd = doc(
          db,
          "ServiciosAIT",
          props.actualServiceAIT.idServiciosAIT
        );

        const updateDataLasEventPost = {
          LastEventPosted: newData.createdAt,
          AvanceEjecucion: newData.porcentajeAvance,
          AvanceAdministrativoTexto: newData.etapa,
          MontoModificado: newData.MontoModificado,
          NuevaFechaEstimada: newData.NuevaFechaEstimada,
          HHModificado: newData.HHModificado,
        }; // Specify the field name and its updated value

        if (newData?.aprobacion !== undefined) {
          updateDataLasEventPost.aprobacion = arrayUnion(newData.aprobacion);
        }

        if (imageUrlPDF !== undefined) {
          updateDataLasEventPost.pdfFile = arrayUnion(imageUrlPDF);
        }

        await updateDoc(RefFirebaseLasEventPostd, updateDataLasEventPost);

        // //Updating global State redux
        // props.saveActualPostFirebase(newData);

        // //reset pagination in HomeScreen to 15 to firebase
        // props.resetPostPerPageHome(5);
        // //once all data is uploaded to firebase , go to homescreen

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
    if (fileSize > 25 * 1024 * 1024) {
      throw new Error("File size exceeds 25MB");
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
    const storageRef = ref(storage, `mainImageEvents/${uuid}`);
    return uploadBytes(storageRef, blob);
  };

  //algorith to retrieve image source that
  const area = props.actualServiceAIT?.AreaServicio;
  const indexareaList = areaLists.findIndex((item) => item.value === area);
  const imageSource = areaLists[indexareaList]?.image;

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: "white" }} // Add backgroundColor here
    >
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

      <TitleForms formik={formik} />

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
  resetPostPerPageHome,
})(InformationScreen);
