import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Aler,
  ImageBackground,
  Image,
} from "react-native";
import { Icon, Avatar, Input } from "@rneui/themed";
import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import { styles } from "./InformationScreen.styles";
import { InfoFormCrusher } from "../../../components/Forms/CrusherForms/InforForm/InfoFormCrusher";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";

function InformationScreen(props) {
  console.log(props);
  const navigation = useNavigation();

  const goToPolines = () => {
    console.log("polinesModule");
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
        <Input
          placeholder="Comentarios"
          multiline={true}
          inputContainerStyle={styles.textArea}
          // onChangeText={(text) => formik.setFieldValue("observacion", text)}
          // errorMessage={formik.errors.observacion}
        />
      </View>

      <InfoFormCrusher />
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
