import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Aler,
  ImageBackground,
  Image,
} from "react-native";
import { Icon, Avatar, Input, Button } from "@rneui/themed";
import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import { styles } from "./InformationScreen.styles";
import { GeneralForms } from "../../../components/Forms/GeneralForms/GeneralForms/GeneralForms";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { initialValues, validationSchema } from "./InformationScreen.data";
import { useFormik } from "formik";

function InformationScreen(props) {
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: (formValue) => {
      try {
        const newData = formValue;
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
        newData.userEmail = loginValidation || "Anonimo";
        newData.createdAt = formattedDate;
        newData.createdData = new Date().toISOString();
        newData.ID = `${formValue.numeroFaja}/${formValue.numeroPolin}-${formValue.posicion}`;
        console.log(formValue);
      } catch (error) {
        alert(error);
      }
    },
  });

  const goToPolines = () => {
    navigation.navigate(screen.post.polines);
  };
  return (
    <KeyboardAwareScrollView>
      <View style={styles.equipments}>
        <Avatar
          size="large"
          rounded
          containerStyle={styles.avatar}
          icon={{ type: "material", name: "person" }}
          source={props.actualEquipment?.image}
        ></Avatar>
        <Icon
          reverse
          type="material-community"
          name="plus"
          color="#8CBBF1"
          containerStyle={styles.btnContainer2}
          onPress={goToPolines}
        />
        <View>
          <Text></Text>
          <Text style={styles.name}>
            {props.actualEquipment?.tag || "Vuelve al Inicio"}
          </Text>
          <Text style={styles.info}>{props.actualEquipment?.nombre}</Text>
        </View>
      </View>
      <View style={styles.equipments}>
        <Image
          source={{
            uri: props.savePhotoUri,
          }}
          style={styles.postPhoto}
        />
        <View>
          <Input
            placeholder="Titulo del Evento"
            onChangeText={(text) => {
              formik.setFieldValue("titulo", text);
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
      </View>
      <GeneralForms formik={formik} />
      <Button
        title="Agregar Dato"
        buttonStyle={styles.addInformation}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </KeyboardAwareScrollView>
  );
}

const mapStateToProps = (reducers) => {
  return reducers.post;
};

export const ConnectedInformationScreen = connect(
  mapStateToProps,
  {}
)(InformationScreen);
