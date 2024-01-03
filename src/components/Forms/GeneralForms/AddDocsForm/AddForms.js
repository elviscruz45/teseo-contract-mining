import { View, Text } from "react-native";
import React, { useState } from "react";
import { styles } from "./AddForms.styles";
import { Input, Button } from "@rneui/themed";
import * as DocumentPicker from "expo-document-picker";
import { Modal } from "../../../shared/Modal/Modal";
import { ChangeDisplayFileTipo } from "../../FormsGeneral/ChangeFIleTipo/ChangeDisplayFileTipo";
import { connect } from "react-redux";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./AddForms.data";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../../../utils";
import { screen } from "../../../../utils";
import { v4 as uuidv4 } from "uuid";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import Toast from "react-native-toast-message";
export function AddDocsFormBare(props) {
  const [pickedDocument, setPickedDocument] = useState(null);
  const [renderComponent, setRenderComponent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [tipoFile, setTipoFile] = useState(null);
  const navigation = useNavigation();

  //configuring the name of the pdf file to make it readable
  let shortNameFile = "";

  if (pickedDocument) {
    shortNameFile = pickedDocument;
    // shortNameFile = pickedDocument.replace(/%20/g, "_").split("/").pop();
  }

  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  //using Formik
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
        (newData.fecha = new Date()), (newData.email = props.email);

        //manage the file updated to ask for aprovals
        let imageUrlPDF;
        if (newData.pdfFile) {
          const snapshotPDF = await uploadPdf(newData.pdfFile);
          const imagePathPDF = snapshotPDF.metadata.fullPath;
          imageUrlPDF = await getDownloadURL(ref(getStorage(), imagePathPDF));
        }

        newData.pdfPrincipal = imageUrlPDF || "";
        newData.FilenameTitle = shortNameFile;

        //Modifying the Service State ServiciosAIT considering the LasEventPost events
        const RefFirebaseLasEventPostd = doc(
          db,
          "ServiciosAIT",
          props.actualServiceAIT?.idServiciosAIT
        );

        const updatedData = {
          pdfFile: arrayUnion(newData),
        };

        await updateDoc(RefFirebaseLasEventPostd, updatedData);
        console.log(newData);
        navigation.navigate(screen.search.search);

        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Documento Agregado Correctamente",
        });
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al tratar de subir estos datos",
        });
        // console.log(error);
      }
    },
  });

  const uploadPdf = async (uri) => {
    const uuid = uuidv4();
    const response = await fetch(uri);
    const blob = await response.blob();
    const fileSize = blob.size;

    if (fileSize > 25 * 1024 * 1024) {
      throw new Error("El archivo excede los 25 MB");
    }
    const storage = getStorage();

    const storageRef = ref(storage, `pdfPost/${uuid}`);

    return uploadBytes(storageRef, blob);
  };

  const selectComponent = (key) => {
    if (key === "tipoFile") {
      setRenderComponent(
        <ChangeDisplayFileTipo
          onClose={onCloseOpenModal}
          formik={formik}
          setTipoFile={setTipoFile}
        />
      );
    }

    onCloseOpenModal();
  };

  //algorith to pick a pdf File to attach to the event
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        // type: "application/pdf",
        copyToCacheDirectory: false,
      });
      if (result.type === "success") {
        setPickedDocument(result.name);
        formik.setFieldValue("pdfFile", result.uri);
        formik.setFieldValue("FilenameTitle", result.name);
        console.log(result.uri);
        console.log(shortNameFile);
      } else {
        setPickedDocument(null);
      }
    } catch (err) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Error al tratar de subir estos datos",
      });
    }
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <View style={styles.content}>
        <Input
          value={shortNameFile}
          errorMessage={formik.errors.pdfFile}
          placeholder="Adjuntar PDF"
          multiline={true}
          editable={false}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => {
              pickDocument();
            },
          }}
        />

        <Input
          value={tipoFile}
          errorMessage={formik.errors.tipoFile}
          placeholder="Tipo de Archivo Adjunto"
          multiline={true}
          editable={false}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => selectComponent("tipoFile"),
          }}
        />
      </View>
      <Button
        title="Agregar Documento"
        buttonStyle={styles.addInformation}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
      <Modal show={showModal} close={onCloseOpenModal}>
        {renderComponent}
      </Modal>
    </View>
  );
}

const mapStateToProps = (reducers) => {
  return {
    email: reducers.profile.email,
    actualServiceAIT: reducers.post.actualServiceAIT,
  };
};

export const AddDocsForm = connect(mapStateToProps, {})(AddDocsFormBare);
