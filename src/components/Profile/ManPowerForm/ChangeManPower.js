import React from "react";
import { View, Alert, Text } from "react-native";
import { Input, Button } from "@rneui/themed";
import { useFormik } from "formik";
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

    // validationSchema: validationSchema(),

    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        //retrieving data from Formik
        const newData = formValue;
        //validations
        if (
          newData.TotalReparacion === "" ||
          newData.Reparacion === "" ||
          newData.TotalFabricacion === "" ||
          newData.Fabricacion === "" ||
          newData.TotalIngenieria === "" ||
          newData.Ingenieria === "" ||
          newData.TotalMaquinado === "" ||
          newData.Maquinado === ""
        ) {
          Alert.alert(
            "Alerta",
            "Complete todos los campos",
            [
              {
                text: "OK",
                onPress: () => console.log("OK button pressed"),
              },
            ],
            { cancelable: false, zIndex: 1000 }
          );
          return;
        }

        if (parseInt(newData.Reparacion) > parseInt(newData.TotalReparacion)) {
          Alert.alert(
            "Alerta",
            "1. Total Reparacion debe ser mayor que Disponible Reparacion",
            [{ text: "OK", onPress: () => {} }]
          );
          return;
        }
        if (
          parseInt(newData.Fabricacion) > parseInt(newData.TotalFabricacion)
        ) {
          Alert.alert(
            "Alerta",
            "3. Total Fabricacion debe ser mayor que Disponible Fabricacion",
            [{ text: "OK", onPress: () => {} }]
          );
          return;
        }

        if (parseInt(newData.Ingenieria) > parseInt(newData.TotalIngenieria)) {
          Alert.alert(
            "Alerta",
            "5. Total Ingenieria debe ser mayor que Disponible Ingenieria",
            [{ text: "OK", onPress: () => {} }]
          );
          return;
        }

        if (parseInt(newData.Maquinado) > parseInt(newData.TotalMaquinado)) {
          Alert.alert(
            "Alerta",
            "7. Total Maquinado debe ser mayor que Disponible Maquinado",
            [{ text: "OK", onPress: () => {} }]
          );
          return;
        }

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
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "La disponibilidad de trabajadores se ha subido correctamente",
        });
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al tratar de subir estos datos",
        });
      }
      onClose();
    },
  });

  return (
    <>
      <View style={[styles.row, styles.center]}>
        <Text style={{ fontSize: 24, fontWeight: "200", marginBottom: 25 }}>
          {"1."}
        </Text>
        <Input
          placeholder="Total Reparacion"
          keyboardType="numeric"
          multiline={true}
          onChangeText={(text) => formik.setFieldValue("TotalReparacion", text)}
          // errorMessage={formik.errors.displayNameform}
        />
      </View>
      <View style={[styles.row, styles.center]}>
        <Text style={{ fontSize: 24, fontWeight: "200", marginBottom: 25 }}>
          {"2."}
        </Text>
        <Input
          placeholder="Disponible Reparacion"
          keyboardType="numeric"
          multiline={true}
          onChangeText={(text) => formik.setFieldValue("Reparacion", text)}
          // errorMessage={formik.errors.cargo}
        />
      </View>

      <View style={[styles.row, styles.center]}>
        <Text style={{ fontSize: 24, fontWeight: "200", marginBottom: 25 }}>
          {"3."}
        </Text>
        <Input
          placeholder="Total Fabricacion"
          keyboardType="numeric"
          multiline={true}
          onChangeText={(text) =>
            formik.setFieldValue("TotalFabricacion", text)
          }
          // errorMessage={formik.errors.displayNameform}
        />
      </View>

      <View style={[styles.row, styles.center]}>
        <Text style={{ fontSize: 24, fontWeight: "200", marginBottom: 25 }}>
          {"4."}
        </Text>
        <Input
          placeholder="Disponible Fabricacion"
          keyboardType="numeric"
          multiline={true}
          onChangeText={(text) => formik.setFieldValue("Fabricacion", text)}
          // errorMessage={formik.errors.cargo}
        />
      </View>

      <View style={[styles.row, styles.center]}>
        <Text style={{ fontSize: 24, fontWeight: "200", marginBottom: 25 }}>
          {"5."}
        </Text>
        <Input
          placeholder="Total Ingenieria"
          keyboardType="numeric"
          multiline={true}
          onChangeText={(text) => formik.setFieldValue("TotalIngenieria", text)}
          // errorMessage={formik.errors.displayNameform}
        />
      </View>

      <View style={[styles.row, styles.center]}>
        <Text style={{ fontSize: 24, fontWeight: "200", marginBottom: 25 }}>
          {"6."}
        </Text>
        <Input
          placeholder="Disponible Ingenieria"
          keyboardType="numeric"
          multiline={true}
          onChangeText={(text) => formik.setFieldValue("Ingenieria", text)}
          // errorMessage={formik.errors.cargo}
        />
      </View>

      <View style={[styles.row, styles.center]}>
        <Text style={{ fontSize: 24, fontWeight: "200", marginBottom: 25 }}>
          {"7."}
        </Text>
        <Input
          placeholder="Total Maquinado"
          keyboardType="numeric"
          multiline={true}
          onChangeText={(text) => formik.setFieldValue("TotalMaquinado", text)}
          // errorMessage={formik.errors.displayNameform}
        />
      </View>

      <View style={[styles.row, styles.center]}>
        <Text style={{ fontSize: 24, fontWeight: "200", marginBottom: 25 }}>
          {"8."}
        </Text>
        <Input
          placeholder="Disponible Maquinado"
          keyboardType="numeric"
          multiline={true}
          onChangeText={(text) => formik.setFieldValue("Maquinado", text)}
          // errorMessage={formik.errors.cargo}
        />
      </View>

      <Button
        title="Actualizar"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </>
  );
}

const mapStateToProps = (reducers) => {
  return {
    user_photo: reducers.profile.user_photo,
    email: reducers.profile.email,
    uid: reducers.profile.uid,
  };
};

export const ChangeManPower = connect(mapStateToProps, {
  update_firebaseProfile,
})(ChangeManPowerBare);
