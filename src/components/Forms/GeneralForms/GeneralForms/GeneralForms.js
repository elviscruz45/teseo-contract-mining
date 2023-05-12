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

  const selectComponent = (key) => {
    if (key === "nombreComponente") {
      setRenderComponent(<SelectExample />);
    }
    if (key === "supervisor") {
      setRenderComponent(<MultiSelectExample />);
    }
    if (key === "equipoTrabajo") {
      setRenderComponent(
        <ChangeDisplayEquipo onClose={onCloseOpenModal} formik={formik} />
      );
    }
    if (key === "recursos") {
      setRenderComponent(
        <ChangeDisplayRecursos onClose={onCloseOpenModal} formik={formik} />
      );
    }
    onCloseOpenModal();
  };

  return (
    <View>
      <Text></Text>
      <View style={styles.content}>
        <Input
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
          placeholder="Equipo de Trabajo"
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
          placeholder="Recursos Usados"
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
