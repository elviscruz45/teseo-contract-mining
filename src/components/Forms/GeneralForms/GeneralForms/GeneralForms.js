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
      console.log("Error picking document", err);
    }
  };

  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  function handleNombreComponente(value) {
    setNombreComponente(value);
  }
  function handleSupervisor(value) {
    setSupervisor(value);
  }
  function handleEquipoTrabajo(value) {
    setEquipoTrabajo(value);
  }
  function handleRecursos(value) {
    setRecursos(value);
  }

  const selectComponent = (key) => {
    if (key === "nombreComponente") {
      setRenderComponent(
        <ChangeDisplayComponent
          onClose={onCloseOpenModal}
          formik={formik}
          handleNombreComponente={handleNombreComponente}
        />
      );
    }
    if (key === "supervisor") {
      setRenderComponent(
        <ChangeDisplaySupervisor
          onClose={onCloseOpenModal}
          formik={formik}
          handleSupervisor={handleSupervisor}
        />
      );
    }
    if (key === "equipoTrabajo") {
      setRenderComponent(
        <ChangeDisplayEquipo
          onClose={onCloseOpenModal}
          formik={formik}
          handleEquipoTrabajo={handleEquipoTrabajo}
        />
      );
    }
    if (key === "recursos") {
      setRenderComponent(
        <ChangeDisplayRecursos
          onClose={onCloseOpenModal}
          formik={formik}
          handleRecursos={handleRecursos}
        />
      );
    }
    onCloseOpenModal();
  };

  return (
    <View>
      <Text></Text>
      <View style={styles.content}>
        <Input
          value={nombreComponente}
          placeholder="Nombre del Componente"
          // editable={false}
          onChangeText={(text) => {
            formik.setFieldValue("nombreComponente", text);
          }}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => selectComponent("nombreComponente"),
          }}
        />
        <Input
          value={supervisor}
          placeholder="Supervisor"
          // editable={false}
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
