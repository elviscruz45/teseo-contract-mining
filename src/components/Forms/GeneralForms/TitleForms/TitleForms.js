import { View, Text, Linking, Button, Image } from "react-native";
import React, { useState } from "react";
import { styles } from "./TitleForms.styles";
import { Input } from "@rneui/themed";
import { Modal } from "../../../shared/Modal/Modal";
import { ChangeDisplayTitulo } from "../../FormsTitle/ChangeTitulo/ChangeDisplayTitulo";
import { connect } from "react-redux";

function TitleFormsBare(props) {
  const { formik } = props;
  const [renderComponent, setRenderComponent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [titulo, setTitulo] = useState(null);

  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  const selectComponent = (key) => {
    if (key === "titulo") {
      setRenderComponent(
        <ChangeDisplayTitulo
          onClose={onCloseOpenModal}
          formik={formik}
          setTitulo={setTitulo}
        />
      );
    }
    onCloseOpenModal();
  };

  return (
    <View style={styles.equipments}>
      <Image
        source={{
          uri: props.savePhotoUri,
        }}
        style={styles.postPhoto}
      />
      <View>
        <Input
          value={titulo}
          placeholder="Titulo del Evento"
          multiline={true}
          editable={true}
          onChangeText={(text) => {
            formik.setFieldValue("titulo", text);
            setTitulo(text);
          }}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => {
              if (props.actualServiceAIT.TipoServicio !== "Instalacion") {
                selectComponent("titulo");
              }
            },
          }}
        />
        <Input
          placeholder="Comentarios"
          multiline={true}
          inputContainerStyle={styles.textArea}
          onChangeText={(text) => {
            formik.setFieldValue("comentarios", text);
          }} // errorMessage={formik.errors.observacion}
        />
      </View>

      <Modal show={showModal} close={onCloseOpenModal}>
        {renderComponent}
      </Modal>
    </View>
  );
}

const mapStateToProps = (reducers) => {
  return {
    savePhotoUri: reducers.post.savePhotoUri,

    actualServiceAIT: reducers.post.actualServiceAIT,
  };
};

export const TitleForms = connect(mapStateToProps, {})(TitleFormsBare);
