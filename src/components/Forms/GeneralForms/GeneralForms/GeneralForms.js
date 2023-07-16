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
import { ChangeDisplayTipo } from "../../ChangeTipo/ChangeDisplayTipo";
import { Modal } from "../../../shared/Modal/Modal";
import { SelectExample } from "../../../shared/Selection";
import { MultiSelectExample } from "../../../shared/MultiSelection";
import { ChangeDisplayEtapa } from "../../FormsGeneral/ChangeEtapa/ChangeDisplayEtapa";
import { ChangeDisplayAvance } from "../../FormsGeneral/ChangeAvance/ChangeDisplayAvance";
import { ChangeDisplayAprobadores } from "../../FormsGeneral/ChangeAprobadores/ChangeDisplayAprobadores";
import { ChangeDisplayMonto } from "../../FormsGeneral/ChangeNumeroMonto/ChangeDisplayMonto";
import { ChangeDisplayFechaFin } from "../../FormsGeneral/ChangeFechaFin/ChangeDisplayFechaFin";
import { ChangeDisplayHH } from "../../FormsGeneral/ChangeNumeroHH/ChangeDisplayHH";
export function GeneralForms(props) {
  const { formik } = props;
  const [pickedDocument, setPickedDocument] = useState(null);
  const [renderComponent, setRenderComponent] = useState(null);
  const [nombreComponente, setNombreComponente] = useState(null);
  const [aprobadores, setAprobadores] = useState(null);
  const [equipoTrabajo, setEquipoTrabajo] = useState(null);
  const [recursos, setRecursos] = useState(null);
  const [etapa, setEtapa] = useState(null);
  const [avance, setAvance] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [fechafin, setFechafin] = useState(null);
  const [monto, setMonto] = useState(null);
  const [horashombre, setHorashombre] = useState(null);

  //algorith to pick a pdf File to attach to the event
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
          setAprobadores={setAprobadores}
          etapa={etapa}
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

  return (
    <View>
      <View style={styles.content}>
        <Text style={styles.subtitleForm}>Avance del Servicio:</Text>

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
        <Input
          value={pickedDocument}
          placeholder="Adjuntar PDF"
          multiline={true}
          editable={false}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => pickDocument(),
          }}
        />
        <Text style={styles.subtitleForm}>Modificaciones (*):</Text>

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
        <Text style={styles.subtitleForm}>* No modificar sin aprobacion</Text>
      </View>

      <Modal show={showModal} close={onCloseOpenModal}>
        {renderComponent}
      </Modal>
    </View>
  );
}
