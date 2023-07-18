import { View, Text, Linking, Button } from "react-native";
import React, { useState } from "react";
import { styles } from "./GeneralForms.styles";
import { Input } from "@rneui/themed";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { ChangeDisplayComponent } from "../../ChangeComponent/ChangeDisplayComponent";
import { ChangeDisplayEquipo } from "../../ChangeEquipo/ChangeDisplayEquipo";
import { ChangeDisplayRecursos } from "../../ChangeRecursos/ChangeDisplayRecursos";
import { ChangeDisplaySupervisor } from "../../ChangeSupervisor/ChangeDisplaySupervisor";
import { ChangeDisplayEtapa } from "../../ChangeEtapa/ChangeDisplayEtapa";
import { ChangeDisplayTipo } from "../../ChangeTipo/ChangeDisplayTipo";
import { Modal } from "../../../shared/Modal/Modal";
import { SelectExample } from "../../../shared/Selection";
import { MultiSelectExample } from "../../../shared/MultiSelection";

export function GeneralForms(props) {
  const { formik } = props;
  const [pickedDocument, setPickedDocument] = useState(null);
  const [renderComponent, setRenderComponent] = useState(null);
  const [nombreComponente, setNombreComponente] = useState(null);
  const [supervisor, setSupervisor] = useState(null);
  const [equipoTrabajo, setEquipoTrabajo] = useState(null);
  const [recursos, setRecursos] = useState(null);
  const [etapa, setEtapa] = useState(null);
  const [tipo, setTipo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: false,
      });
      if (result.type === "success") {
        setPickedDocument(result.uri);
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
        />
      );
    }
    if (key === "tipo") {
      setRenderComponent(
        <ChangeDisplayTipo
          onClose={onCloseOpenModal}
          formik={formik}
          setTipo={setTipo}
        />
      );
    }
    if (key === "nombreComponente") {
      setRenderComponent(
        <ChangeDisplayComponent
          onClose={onCloseOpenModal}
          formik={formik}
          setNombreComponente={setNombreComponente}
        />
      );
    }
    if (key === "supervisor") {
      setRenderComponent(
        <ChangeDisplaySupervisor
          onClose={onCloseOpenModal}
          formik={formik}
          setSupervisor={setSupervisor}
        />
      );
    }
    if (key === "equipoTrabajo") {
      setRenderComponent(
        <ChangeDisplayEquipo
          onClose={onCloseOpenModal}
          formik={formik}
          setEquipoTrabajo={setEquipoTrabajo}
        />
      );
    }
    if (key === "recursos") {
      setRenderComponent(
        <ChangeDisplayRecursos
          onClose={onCloseOpenModal}
          formik={formik}
          setRecursos={setRecursos}
        />
      );
    }
    onCloseOpenModal();
  };

  return (
    <View>
      <View style={styles.content}>
        <Text style={styles.subtitleForm}>Detalles del Evento:</Text>

        <Input
          value={etapa}
          placeholder="Etapa del Evento"
          editable={false}
          onChangeText={(text) => {
            formik.setFieldValue("etapa", text);
          }}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => selectComponent("etapa"),
          }}
        />
        <Input
          value={tipo}
          placeholder="Descripcion del Evento"
          editable={false}
          onChangeText={(text) => {
            formik.setFieldValue("tipo", text);
          }}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => selectComponent("tipo"),
          }}
        />
        <Input
          value={nombreComponente}
          placeholder="Nombre del Componente"
          editable={false}
          onChangeText={(text) => {
            formik.setFieldValue("nombreComponente", text);
          }}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => selectComponent("nombreComponente"),
          }}
        />
        <Text style={styles.subtitleForm}>Equipo y Recursos de trabajo:</Text>

        <Input
          value={supervisor}
          placeholder="Supervisor"
          editable={false}
          onChangeText={(text) => {
            formik.setFieldValue("supervisor", text);
          }}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => selectComponent("supervisor"),
          }}
        />
        <Input
          value={equipoTrabajo}
          placeholder="Equipo de Trabajo"
          multiline={true}
          editable={false}
          onChangeText={(text) => {
            formik.setFieldValue("equipoTrabajo", text);
          }}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => selectComponent("equipoTrabajo"),
          }}
        />
        <Input
          value={recursos}
          placeholder="Recursos Usados"
          editable={false}
          multiline={true}
          // editable={false}
          onChangeText={(text) => {
            formik.setFieldValue("recursos", text);
          }}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => selectComponent("recursos"),
          }}
        />
        <Text style={styles.content}>Archivos:</Text>

        <Input
          value={pickedDocument}
          placeholder="Adjuntar PDF"
          multiline={true}
          editable={false}
          onChangeText={(text) => {
            formik.setFieldValue("pdfFile", text);
          }}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => pickDocument(),
          }}
        />
      </View>

      <Modal show={showModal} close={onCloseOpenModal}>
        {renderComponent}
      </Modal>
    </View>
  );
}
