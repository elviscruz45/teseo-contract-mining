import { View, Text } from "react-native";
import { Avatar, Button } from "@rneui/themed";
import React, { useState } from "react";
import { connect } from "react-redux";
import { styles } from "./InformationScreen.styles";
import { GeneralForms } from "../../../components/Forms/GeneralForms/GeneralForms/GeneralForms";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { initialValues, validationSchema } from "./InformationScreen.data";
import { saveActualPostFirebase } from "../../../actions/post";
import { useFormik } from "formik";
import { areaLists } from "../../../utils/areaList";
import { TitleForms } from "../../../components/Forms/GeneralForms/TitleForms/TitleForms";
import { resetPostPerPageHome } from "../../../actions/home";
import { handleFormSubmit } from "./InformatioScreen.calc";

function InformationScreen(props) {
  // retrieving data from formik forms ,data from ./InfomartionScreen.data.js
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: (formValue) => handleFormSubmit(formValue, props),
  });

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
        // loading={formik.isSubmitting}
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
