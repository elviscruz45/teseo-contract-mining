import React, { useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../../utils";
import { screen } from "../../../utils";
import { useNavigation } from "@react-navigation/native";

export const handleFormSubmit = async (formValue, props) => {
  console.log("handleFormSubmit");
  const navigation = useNavigation();
  try {
    const newData = formValue;

    //create the algoritm to have the date format of the post
    newData.fechaPostFormato = dateFormat();

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

    //--------Uploading request to a new collection called "aprovals" to manage aprovals

    if (
      newData.etapa === "Contratista-Envio Cotizacion" ||
      newData.etapa === "Contratista-Solicitud Ampliacion Servicio" ||
      newData.etapa === "Contratista-Envio EDP" ||
      newData.etapa === "Contratista-Solicitud Aprobacion Doc"
    ) {
      const regex = /(?<=\()[^)]*(?=\))/g;
      const matches = newData.aprobacion.match(regex);

      const docData = {
        solicitud: newData.etapa,
        solicitudComentario: newData.comentarios,
        etapa: newData.etapa,
        NombreServicio: props.actualServiceAIT.NombreServicio,
        IdAITService: props.actualServiceAIT.idServiciosAIT,
        fileName: newData?.pdfFile?.replace(/%20/g, "_").split("/").pop() ?? "",
        pdfFile: imageUrlPDF ?? "",
        tipoFile: newData.tipoFile ?? "",
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
      console.log("Approvalsss", docData);
    }

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
    newData.AITNuevaFechaEstimada = props.actualServiceAIT.NuevaFechaEstimada;
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
    props.saveActualPostFirebase(newData);

    // //reset pagination in HomeScreen to 15 to firebase
    // props.resetPostPerPageHome(5);
    // //once all data is uploaded to firebase , go to homescreen

    navigation.navigate(screen.post.post); // this hedlps to go to the begining of the process
    navigation.navigate(screen.home.tab, {
      screen: screen.home.home,
    });
    alert("Se ha subido correctamente");
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

const dateFormat = () => {
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
  return formattedDate;
};

const uploadImage = async (uri) => {
  const uuid = uuidv4();

  const response = await fetch(uri);
  const blob = await response.blob();

  const storage = getStorage();
  const storageRef = ref(storage, `mainImageEvents/${uuid}`);
  return uploadBytes(storageRef, blob);
};

const uploadPdf = async (uri) => {
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
