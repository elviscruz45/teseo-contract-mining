import React from "react";
import { View } from "react-native";
import { Input, Button } from "@rneui/themed";
import { useFormik } from "formik";
import { getAuth, updateProfile } from "firebase/auth";
import Toast from "react-native-toast-message";
import { initialValues, validationSchema } from "./ChangeManPower.data";
import { styles } from "./ChangeManPower.styles";
import { connect } from "react-redux";
import { db } from "../../../utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { collection, doc, setDoc } from "firebase/firestore";
import { update_firebaseProfile } from "../../../actions/profile";
import { v4 as uuidv4 } from "uuid";

function ChangeManPowerBare(props) {
  const { onClose } = props;

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        //retrieving data from Formik
        const newData = formValue;
        //sign up the users in Firestore Database
        newData.photoURL = props.user_photo;
        newData.email = props.email;
        //Data about the company belong this event
        const regex = /@(.+?)\./i;
        newData.companyName = props.email?.match(regex)?.[1] || "Anonimo";

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
        newData.createdAt = new Date();

        ///checking up if there are data in users
        const uuid = uuidv4();
        newData.uid = uuid;
        const docRef = doc(collection(db, "manpower"), newData.uid);
        await setDoc(docRef, newData);
        onClose();
        alert("Se ha subido correctamente");
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al tratar de subir estos datos",
        });
      }
    },
  });

  return (
    <>
      <KeyboardAwareScrollView>
        <Input
          placeholder="Total Tecnicos de Reparacion"
          keyboardType="numeric"
          multiline={true}
          rightIcon={{
            type: "material-community",
            name: "account-circle-outline",
            color: "#c2c2c2",
          }}
          onChangeText={(text) => formik.setFieldValue("TotalReparacion", text)}
          // errorMessage={formik.errors.displayNameform}
        />
        <Input
          placeholder="Tecnicos de Reparacion"
          keyboardType="numeric"
          multiline={true}
          rightIcon={{
            type: "material-community",
            name: "account-circle-outline",
            color: "#c2c2c2",
          }}
          onChangeText={(text) => formik.setFieldValue("Reparacion", text)}
          // errorMessage={formik.errors.cargo}
        />
        <Input
          placeholder="Total Tecnicos de Fabricacion"
          keyboardType="numeric"
          multiline={true}
          rightIcon={{
            type: "material-community",
            name: "account-circle-outline",
            color: "#c2c2c2",
          }}
          onChangeText={(text) =>
            formik.setFieldValue("TotalFabricacion", text)
          }
          // errorMessage={formik.errors.displayNameform}
        />
        <Input
          placeholder="Tecnicos de Fabricacion"
          keyboardType="numeric"
          multiline={true}
          rightIcon={{
            type: "material-community",
            name: "account-circle-outline",
            color: "#c2c2c2",
          }}
          onChangeText={(text) => formik.setFieldValue("Fabricacion", text)}
          // errorMessage={formik.errors.cargo}
        />
        <Input
          placeholder="Total Tecnicos de Ingenieria"
          keyboardType="numeric"
          multiline={true}
          rightIcon={{
            type: "material-community",
            name: "account-circle-outline",
            color: "#c2c2c2",
          }}
          onChangeText={(text) => formik.setFieldValue("TotalIngenieria", text)}
          // errorMessage={formik.errors.displayNameform}
        />
        <Input
          placeholder="Tecnicos de Ingenieria"
          keyboardType="numeric"
          multiline={true}
          rightIcon={{
            type: "material-community",
            name: "account-circle-outline",
            color: "#c2c2c2",
          }}
          onChangeText={(text) => formik.setFieldValue("Ingenieria", text)}
          // errorMessage={formik.errors.cargo}
        />
        <Input
          placeholder="Total Tecnicos de Maquinado"
          keyboardType="numeric"
          multiline={true}
          rightIcon={{
            type: "material-community",
            name: "account-circle-outline",
            color: "#c2c2c2",
          }}
          onChangeText={(text) => formik.setFieldValue("TotalMaquinado", text)}
          // errorMessage={formik.errors.displayNameform}
        />
        <Input
          placeholder="Tecnicos de Maquinado"
          keyboardType="numeric"
          multiline={true}
          rightIcon={{
            type: "material-community",
            name: "account-circle-outline",
            color: "#c2c2c2",
          }}
          onChangeText={(text) => formik.setFieldValue("Maquinado", text)}
          // errorMessage={formik.errors.cargo}
        />
        <Button
          title="Actualizar"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
        />
      </KeyboardAwareScrollView>
    </>
  );
}

const mapStateToProps = (reducers) => {
  return {
    firebase_user_name: reducers.profile.firebase_user_name,
    user_photo: reducers.profile.user_photo,
    email: reducers.profile.email,
    profile: reducers.profile.profile,
    uid: reducers.profile.uid,

    savePhotoUri: reducers.post.savePhotoUri,
    actualEquipment: reducers.post.actualEquipment,
  };
};

export const ChangeManPower = connect(mapStateToProps, {
  update_firebaseProfile,
})(ChangeManPowerBare);
