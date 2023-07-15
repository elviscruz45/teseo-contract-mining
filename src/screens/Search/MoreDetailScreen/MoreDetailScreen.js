import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  Pressable,
  Linking,
} from "react-native";
import { Image as ImageExpo } from "expo-image";
import { styles } from "./MoreDetailScreen.styles";
import { SearchBar, Icon, Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

import { equipmentList } from "../../../utils/equipmentList";
import { db } from "../../../utils";
import { screen } from "../../../utils";
import { getExcelEquipo } from "../../../utils/excelData";
import { connect } from "react-redux";
import { saveActualEquipment } from "../../../actions/post";
import { EquipmentListUpper } from "../../../actions/home";
import { DateScreen } from "../../../components/Post/DateScreen/DateScreen";
import { areaLists } from "../../../utils/areaList";

const windowWidth = Dimensions.get("window").width;
function MoreDetailScreenNoRedux(props) {
  console.log("itemScreen");
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [firestoreEquipmentLiked, setFirestoreEquipmentLiked] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [removeFilter, setRemoveFilter] = useState(true);

  //Retrieve data Item that comes from the previous screen to render the Updated Status
  const {
    route: {
      params: { Item },
    },
  } = props;
  console.log("porps ITEM");
  const navigation = useNavigation();

  ///the algoritm to retrieve the image source to render the icon
  const area = Item.AreaServicio;
  const indexareaList = areaLists.findIndex((item) => item.value === area);
  const imageSource = areaLists[indexareaList]?.image;
  /// the algorithm to retrieve the amount with format
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "decimal",
    useGrouping: true,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Item.Monto);
  ///algoritm to change the format of FechaFin from ServiciosAIT firebase collection
  const date = new Date(Item.FechaFin.seconds * 1000);
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
  const formattedDate = `${day} ${month} ${year}`;

  ///algoritm to change the format of FechaInicio from ServiciosAIT firebase collection
  const dateInicio = new Date(Item.createdAt.seconds * 1000);
  const monthNamesInicio = [
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
  const dayInicio = dateInicio.getDate();
  const monthInicio = monthNamesInicio[dateInicio.getMonth()];
  const yearInicio = dateInicio.getFullYear();
  const formattedDateInicio = `${dayInicio} ${monthInicio} ${yearInicio}`;

  //Algoritm to calculate  "Avance Ejecucion Proyectado"
  const ActualDate = new Date();
  const DaysProyectedToCompleteTask = date - dateInicio;
  const AvanceProyected =
    ((ActualDate - new Date(Item.createdAt.seconds * 1000)) * 100) /
    DaysProyectedToCompleteTask;

  //Changing the value to activate again the filter to rende the posts
  const filter = (start, end) => {
    console.log("filter");
    setStartDate(start);
    setEndDate(end);
  };
  const quitfilter = () => {
    setRemoveFilter((prev) => !prev);
    setStartDate(null);
    setEndDate(null);
    console.log("removeFilter");
  };

  //Using navigation.navigate I send it to another screen (post)
  const goToPublicar = () => {
    props.saveActualEquipment(Item);

    navigation.navigate(screen.post.tab, {
      screen: screen.post.camera,
      params: { Item: Item },
    });
  };

  //This function is used to retrive the image file to the icon
  function chooseImageEquipment(tags) {
    const result = equipmentList.find((item) => {
      return item.tag == tags;
    });
    return result.image;
  }

  return (
    <>
      <Text></Text>

      <Text style={styles.name}>{Item.NombreServicio}</Text>

      <Image source={imageSource} style={styles.roundImage} />

      <View style={[styles.row, styles.center]}>
        <View>
          <Text></Text>
          <Text style={styles.info}>
            {"Numero de AIT:  "} {Item.NumeroAIT}
          </Text>
          <Text style={styles.info}>
            {"Numero de Cotizacion:  "} {Item.NumeroCotizacion}
          </Text>
          <Text style={styles.info}>
            {"Tipo de Servicio:  "} {Item.TipoServicio}
          </Text>
          <Text style={styles.info}>
            {"Area del Servicio:  "} {Item.AreaServicio}
          </Text>
          <Text style={styles.info}>
            {"Nombre de la Empresa:  "} {Item.companyName}
          </Text>
          <Text style={styles.info}>
            {"Creado por:  "} {Item.emailPerfil}
          </Text>
          <Text style={styles.info}>
            {"Monto de Cotizacion:  "} {formattedAmount} {Item.Moneda}
          </Text>
          <Text style={styles.info}>
            {"Fecha de Asignacion:  "} {formattedDateInicio}
          </Text>
          <Text style={styles.info}>
            {"Fecha de Fin Propuesto:  "} {formattedDate}
          </Text>
          <Text style={styles.info}>
            {"Horas Hombre Cotizadas:  "} {Item.HorasHombre}
            {" HH"}
          </Text>
          <Text style={styles.info}>
            {"Avance Ejecucion Real:  "} {Item.AvanceEjecucion}
            {" %"}
          </Text>
          <Text style={styles.info}>
            {"Avance Ejecucion Proyectado:  "} {AvanceProyected.toFixed(2)}
            {" %"}
          </Text>

          <Text style={styles.info}>
            {"Avance Administrativo:  "} {Item.AvanceAdministrativo}
            {" %"}
          </Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text style={styles.info}>
            {"Administradores de Contratos:  "}{" "}
            {Item.ResponsableEmpresaContratista}
          </Text>
          <Text style={styles.info}>
            {"Supervisores Responsables:  "} {Item.ResponsableEmpresaUsuario}
          </Text>
        </View>
      </View>
    </>
  );
}

const mapStateToProps = (reducers) => {
  return {
    profile: reducers.profile.firebase_user_name,
    user_photo: reducers.profile.user_photo,
    savePhotoUri: reducers.post.savePhotoUri,
    actualEquipment: reducers.post.actualEquipment,
    uid: reducers.profile.uid,
    equipmentListHeader: reducers.home.equipmentList,
  };
};

export const MoreDetailScreen = connect(mapStateToProps, {
  saveActualEquipment,
  EquipmentListUpper,
})(MoreDetailScreenNoRedux);
