import React from "react";
import { Input, Button } from "@rneui/themed";
import { useFormik } from "formik";
import { getAuth, updateProfile } from "firebase/auth";
import Toast from "react-native-toast-message";
import { initialValues, validationSchema } from "./ChangeDisplayNameForm.data";
import { styles } from "./ChangeDisplayNameForm.styles";
import { connect } from "react-redux";
import { db } from "../../../utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { collection, doc, setDoc } from "firebase/firestore";
import { update_firebaseProfile } from "../../../actions/profile";
import { update_firebaseUserName } from "../../../actions/profile";
import { userTypeList } from "../../../utils/userTypeList";

function ChangeDisplayNameForm(props) {
  const { onClose } = props;

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      const newData = formValue;

      try {
        //Update of Authentication Firebase
        const currentLoginUser = getAuth().currentUser;
        await updateProfile(currentLoginUser, {
          displayName: newData.displayNameform,
        });
        //sign up the users in Firestore Database
        newData.photoURL = props.user_photo;
        newData.email = props.email;
        newData.companyName = props.email?.match(/@(.+?)\./i)?.[1] || "";
        newData.userType = userTypeList.worker;
        newData.uid = props.uid;
        newData.EquipmentFavorities = [];
        ///checking up if there are data in users
        const docRef = doc(collection(db, "users"), newData.uid);
        await setDoc(docRef, newData);
        props.update_firebaseProfile(newData);
        props.update_firebaseUserName(newData.displayNameform);
        onClose();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al cambiar el nombre y apellidos",
        });
      }
    },
  });

  return (
    <>
      <KeyboardAwareScrollView>
        <Input
          placeholder="Nombre y apellidos"
          multiline={true}
          rightIcon={{
            type: "material-community",
            name: "account-circle-outline",
            color: "#c2c2c2",
          }}
          onChangeText={(text) => formik.setFieldValue("displayNameform", text)}
          // errorMessage={formik.errors.displayNameform}
        />
        <Input
          placeholder="Escribe tu cargo"
          multiline={true}
          rightIcon={{
            type: "material-community",
            name: "account-circle-outline",
            color: "#c2c2c2",
          }}
          onChangeText={(text) => formik.setFieldValue("cargo", text)}
          // errorMessage={formik.errors.cargo}
        />
        <Input
          placeholder="Descripcion"
          multiline={true}
          rightIcon={{
            type: "material-community",
            name: "account-circle-outline",
            color: "#c2c2c2",
          }}
          onChangeText={(text) => formik.setFieldValue("descripcion", text)}
          // errorMessage={formik.errors.displayName}
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
    user_photo: reducers.profile.user_photo,
    email: reducers.profile.email,
    profile: reducers.profile.profile,
    uid: reducers.profile.uid,
  };
};

export const ConnectedChangeDisplayNameForm = connect(mapStateToProps, {
  update_firebaseProfile,
  update_firebaseUserName,
})(ChangeDisplayNameForm);
