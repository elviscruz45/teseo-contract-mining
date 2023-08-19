import {
  View,
  Text,
  Linking,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { styles } from "./GeneralForms.styles";
import { Input } from "@rneui/themed";
import * as DocumentPicker from "expo-document-picker";
import { Modal } from "../../../shared/Modal/Modal";
import { ChangeDisplayEtapa } from "../../FormsGeneral/ChangeEtapa/ChangeDisplayEtapa";
import { ChangeDisplayAvance } from "../../FormsGeneral/ChangeAvance/ChangeDisplayAvance";
import { ChangeDisplayAprobadores } from "../../FormsGeneral/ChangeAprobadores/ChangeDisplayAprobadores";
import { ChangeDisplayMonto } from "../../FormsGeneral/ChangeNumeroMonto/ChangeDisplayMonto";
import { ChangeDisplayFechaFin } from "../../FormsGeneral/ChangeFechaFin/ChangeDisplayFechaFin";
import { ChangeDisplayHH } from "../../FormsGeneral/ChangeNumeroHH/ChangeDisplayHH";
import { ChangeDisplayFileTipo } from "../../FormsGeneral/ChangeFIleTipo/ChangeDisplayFileTipo";
import { connect } from "react-redux";

export function GeneralFormsBare(props) {
  const { formik } = props;
  const [pickedDocument, setPickedDocument] = useState(null);
  const [renderComponent, setRenderComponent] = useState(null);
  const [aprobadores, setAprobadores] = useState(null);
  const [etapa, setEtapa] = useState(null);
  const [avance, setAvance] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [fechafin, setFechafin] = useState(null);
  const [monto, setMonto] = useState(null);
  const [horashombre, setHorashombre] = useState(null);
  const [aditional, setAditional] = useState(false);
  const [tipoFile, setTipoFile] = useState(null);

  //configuring the name of the pdf file to make it readable
  let shortNameFile = "";

  if (pickedDocument) {
    shortNameFile = pickedDocument.replace(/%20/g, "_").split("/").pop();
  }

  //algorith to pick a pdf File to attach to the event
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        // type: "application/pdf",
        copyToCacheDirectory: false,
      });
      if (result.type === "success") {
        setPickedDocument(result.uri);
        formik.setFieldValue("pdfFile", result.uri);
        formik.setFieldValue("FilenameTitle", shortNameFile);
      } else {
        setPickedDocument(null);
      }
    } catch (err) {
      alert("Error picking document", err);
    }
  };

  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  const selectComponent = (key) => {
    if (key === "etapa") {
      setRenderComponent(
        <ChangeDisplayEtapa
          onClose={onCloseOpenModal}
          formik={formik}
          setEtapa={setEtapa}
          setAprobadores={setAprobadores}
          etapa={etapa}
        />
      );
    }
    if (key === "tipoFile") {
      setRenderComponent(
        <ChangeDisplayFileTipo
          onClose={onCloseOpenModal}
          formik={formik}
          setTipoFile={setTipoFile}
        />
      );
    }
    if (key === "porcentajeAvance") {
      setRenderComponent(
        <ChangeDisplayAvance
          onClose={onCloseOpenModal}
          formik={formik}
          setAvance={setAvance}
        />
      );
    }
    if (key === "aprobacion") {
      setRenderComponent(
        <ChangeDisplayAprobadores
          onClose={onCloseOpenModal}
          formik={formik}
          setAprobadores={setAprobadores}
          etapa={etapa}
        />
      );
    }
    if (key === "MontoModificado") {
      setRenderComponent(
        <ChangeDisplayMonto
          onClose={onCloseOpenModal}
          formik={formik}
          setMonto={setMonto}
        />
      );
    }
    if (key === "NuevaFechaEstimada") {
      setRenderComponent(
        <ChangeDisplayFechaFin
          onClose={onCloseOpenModal}
          formik={formik}
          setFechafin={setFechafin}
        />
      );
    }
    if (key === "HHModificado") {
      setRenderComponent(
        <ChangeDisplayHH
          onClose={onCloseOpenModal}
          formik={formik}
          setHorashombre={setHorashombre}
        />
      );
    }
    onCloseOpenModal();
  };

  const handlesetAditional = () => {
    if (props.email === "daniel@prodise.com") {
      setAditional(true);
    } else {
      alert(
        "Solicitar Autorizacion al Gerente de Proyecto para Modificar El Monto, Fecha Estimada y Horas Hombre"
      );
    }
  };

  return (
    <View>
      <View style={styles.content}>
        {/* <Text style={styles.subtitleForm}>Avance del Servicio:</Text> */}

        <Input
          value={etapa}
          placeholder="Etapa del Evento"
          editable={false}
          errorMessage={formik.errors.etapa}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => selectComponent("etapa"),
          }}
        />
        {etapa === "Contratista-Avance Ejecucion" && (
          <Input
            value={avance ? `${avance} %` : null}
            placeholder="Avance del ejecucion"
            editable={false}
            errorMessage={formik.errors.porcentajeAvance}
            rightIcon={{
              type: "material-community",
              name: "arrow-right-circle-outline",
              onPress: () => selectComponent("porcentajeAvance"),
            }}
          />
        )}
        {(etapa === "Contratista-Envio Cotizacion" ||
          etapa === "Contratista-Solicitud Ampliacion Servicio" ||
          etapa === "Contratista-Envio EDP" ||
          etapa === "Contratista-Solicitud Aprobacion Doc") && (
          <Input
            value={aprobadores}
            placeholder="Aprobador"
            editable={false}
            multiline={true}
            errorMessage={formik.errors.aprobacion}
            rightIcon={{
              type: "material-community",
              name: "arrow-right-circle-outline",
              onPress: () => selectComponent("aprobacion"),
            }}
          />
        )}

        <Input
          value={shortNameFile}
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

        {shortNameFile && (
          <Input
            value={tipoFile}
            placeholder="Tipo de Archivo Adjunto"
            multiline={true}
            editable={false}
            rightIcon={{
              type: "material-community",
              name: "arrow-right-circle-outline",
              onPress: () => selectComponent("tipoFile"),
            }}
          />
        )}

        <View style={styles.iconMinMax}>
          <TouchableOpacity onPress={() => handlesetAditional()}>
            <Image
              source={require("../../../../../assets/plus3.png")}
              style={styles.roundImageUploadmas}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setAditional(false)}>
            <Image
              source={require("../../../../../assets/minus3.png")}
              style={styles.roundImageUploadmas}
            />
          </TouchableOpacity>
        </View>

        {aditional && (
          <>
            <Text style={styles.subtitleForm}>Modificaciones (*)</Text>

            <Input
              value={monto}
              placeholder="No hay modificacion de Monto Cotizado"
              multiline={true}
              editable={false}
              // errorMessage={formik.errors.MontoModificado}
              rightIcon={{
                type: "material-community",
                name: "arrow-right-circle-outline",
                onPress: () => selectComponent("MontoModificado"),
              }}
            />
            <Input
              value={fechafin}
              placeholder="No hay modificacion de Fecha Fin"
              editable={false}
              // errorMessage={formik.errors.NuevaFechaEstimada}
              multiline={true}
              // editable={false}

              rightIcon={{
                type: "material-community",
                name: "arrow-right-circle-outline",
                onPress: () => selectComponent("NuevaFechaEstimada"),
              }}
            />

            <Input
              value={horashombre}
              placeholder="No hay modificacion de Horas Hombres"
              editable={false}
              // errorMessage={formik.errors.HHModificado}
              multiline={true}
              rightIcon={{
                type: "material-community",
                name: "arrow-right-circle-outline",
                onPress: () => selectComponent("HHModificado"),
              }}
            />
            <Text style={styles.subtitleForm}>
              * No modificar sin aprobacion
            </Text>
          </>
        )}
      </View>

      <Modal show={showModal} close={onCloseOpenModal}>
        {renderComponent}
      </Modal>
    </View>
  );
}

const mapStateToProps = (reducers) => {
  return {
    profile: reducers.profile.firebase_user_name,
    email: reducers.profile.email,
    approvalQuantity: reducers.profile.approvalQuantity,
    approvalList: reducers.home.approvalList,

    totalEventServiceAITLIST: reducers.home.totalEventServiceAITLIST,
  };
};

export const GeneralForms = connect(mapStateToProps, {})(GeneralFormsBare);
