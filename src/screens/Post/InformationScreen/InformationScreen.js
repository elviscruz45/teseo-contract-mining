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

function InformationScreen(props) {
  console.log(props);
  return (
    <>
      <View style={styles.equipments}>
        <Avatar
          size="large"
          rounded
          containerStyle={styles.avatar}
          icon={{ type: "material", name: "person" }}
          source={props.actualEquipment?.image}
        ></Avatar>
        <View>
          <Text></Text>
          <Text style={styles.name}>
            {props.actualEquipment?.tag || "Selecciona Equipo"}
          </Text>
          <Text style={styles.info}>
            {props.actualEquipment?.nombre || "de la lista"}
          </Text>
        </View>
      </View>

      <Image
        source={{
          uri: props.savePhotoUri,
        }}
        style={styles.postPhoto}
      />
      <View>
        <Text></Text>
        <View style={styles.content}>
          <Input
            placeholder="Numero de Faja"
            defaultValue={defaultValueFaja}
            editable={false}
            onChangeText={() =>
              formik.setFieldValue(
                "numeroFaja",
                defaultValueFaja || CopyBeltNumber.numeroFaja
              )
            }
            // errorMessage={formik.errors.numeroFaja}
            rightIcon={{
              type: "material-community",
              name: "tag-multiple-outline",
              // color: getColorIconMap(formik),
              // onPress: () => selectComponent("numeroFaja"),
            }}
          />
          <Input
            placeholder="Zona/Tipo"
            // defaultValue={defaultValueZone}
            editable={false}
            // onChangeText={() =>
            //   formik.setFieldValue(
            //     "zona",
            //     defaultValueZone || CopyBeltNumber.zona
            //   )
            // }
            // errorMessage={formik.errors.zona}
            rightIcon={{
              type: "material-community",
              name: "multicast",
              // color: getColorIconMap(formik),
              // onPress: () => selectComponent("zona"),
            }}
          />
          <Input
            placeholder="Numero Polin"
            defaultValue={defaultValueIdler}
            editable={false}
            // onChangeText={() =>
            //   formik.setFieldValue(
            //     "numeroPolin",
            //     defaultValueIdler || CopyBeltNumber.numeroPolin
            //   )
            // }
            // errorMessage={formik.errors.numeroPolin}
            rightIcon={{
              type: "material-community",
              name: "numeric",
              // color: getColorIconMap(formik),
              onPress: () => selectComponent("numeroPolin"),
            }}
          />
          <Input
            placeholder="Posicion"
            defaultValue={defaultValuePosition}
            editable={false}
            onChangeText={() =>
              formik.setFieldValue("posicion", defaultValuePosition)
            }
            errorMessage={formik.errors.posicion}
            rightIcon={{
              type: "material-community",
              name: "clipboard-list-outline",
              // color: getColorIconMap(formik),
              onPress: () => selectComponent("posicion"),
            }}
          />
          <Input
            placeholder="Condicion"
            defaultValue={defaultValueCondition}
            editable={false}
            onChangeText={() =>
              formik.setFieldValue("condicion", defaultValueCondition)
            }
            errorMessage={formik.errors.condicion}
            rightIcon={{
              type: "material-community",
              name: "bullseye",
              // color: getColorIconMap(formik),
              onPress: () => selectComponent("condicion"),
            }}
          />
          <Input
            placeholder="Prioridad"
            defaultValue={defaultValuePriority}
            editable={false}
            onChangeText={() =>
              formik.setFieldValue("prioridad", defaultValuePriority)
            }
            errorMessage={formik.errors.prioridad}
            rightIcon={{
              type: "material-community",
              name: "priority-high",
              // color: getColorIconMap(formik),
              onPress: () => selectComponent("prioridad"),
            }}
          />
          <Input
            placeholder="Colocar Observaciones"
            defaultValue={defaultValueObservation}
            // keyboardType="numeric"
            multiline={true}
            inputContainerStyle={styles.textArea}
            onChangeText={(text) => formik.setFieldValue("observacion", text)}
            errorMessage={formik.errors.observacion}
          />
        </View>
        <Modal show={showModal} close={onCloseOpenModal}>
          {renderComponent}
        </Modal>
      </View>
    </>
  );
}

const mapStateToProps = (reducers) => {
  return reducers.post;
};

export const ConnectedInformationScreen = connect(
  mapStateToProps,
  {}
)(InformationScreen);
