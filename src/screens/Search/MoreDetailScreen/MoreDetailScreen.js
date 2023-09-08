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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const windowWidth = Dimensions.get("window").width;
function MoreDetailScreenNoRedux(props) {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [firestoreEquipmentLiked, setFirestoreEquipmentLiked] = useState();

  //Retrieve data Item that comes from the previous screen to render the Updated Status
  const {
    route: {
      params: { Item },
    },
  } = props;
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

  ///function to change the format of FechaFin from ServiciosAIT firebase collection
  const formatDate = (item) => {
    const date = new Date(item);

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
    const formattedDate = `${day} ${month} ${year}`;
    return formattedDate;
  };

  // Considering if there are a modification in the service
  const HHModificado = Item?.HHModificado ?? 0;
  const MontoModificado = Item?.MontoModificado ?? 0;
  const NuevaFechaEstimada = Item?.NuevaFechaEstimada ?? 0;

  const HHtoRender =
    HHModificado > Item.HorasHombre ? HHModificado : Item.HorasHombre;
  const MontoModificadotoRender =
    MontoModificado > Item.Monto ? MontoModificado : Item.Monto;
  const NuevaFechaEstimadatoRender =
    NuevaFechaEstimada > Item?.FechaFin
      ? formatDate(NuevaFechaEstimada?.seconds * 1000)
      : formatDate(Item?.FechaFin?.seconds * 1000);

  const NuevaFechaEstimadatoCalculate =
    NuevaFechaEstimada > Item?.FechaFin
      ? NuevaFechaEstimada?.seconds * 1000
      : Item?.FechaFin?.seconds * 1000;

  //Algoritm to calculate  "Avance Ejecucion Proyectado"
  const ActualDate = new Date();
  const DaysProyectedToCompleteTask =
    NuevaFechaEstimadatoCalculate - new Date(Item.createdAt.seconds * 1000);
  let AvanceProyected =
    ((ActualDate - new Date(Item.createdAt.seconds * 1000)) * 100) /
    DaysProyectedToCompleteTask;
  if (AvanceProyected > 100) {
    AvanceProyected = 100;
  }

  //Algorithm to   convert string to a list to render a list of names
  const ContratistaList = Item.ResponsableEmpresaContratista?.split(",");
  const UsuarioList = Item.ResponsableEmpresaUsuario?.split(",");

  const ResposableList = (array) => {
    return (
      <View>
        <FlatList
          data={array}
          renderItem={({ item }) => {
            return (
              <View>
                <Text style={styles.info3}>{item}</Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
        />
      </View>
    );
  };

  //Algorithm to render the bar status
  const BarProgress = (percentage) => {
    const TotalSizeCompleted = windowWidth - 20;
    const percentajeNormalized = (percentage * TotalSizeCompleted) / 100;

    getColor = () => {
      if (Item.AvanceEjecucion >= AvanceProyected) {
        return "blue";
      } else {
        return "red";
      }
    };
    return (
      <View style={{ flexDirection: "row", height: 10, margin: 10 }}>
        <View
          style={{
            backgroundColor: getColor(),
            width: percentajeNormalized ? percentajeNormalized : 0,
            borderRadius: 5,
          }}
        />
      </View>
    );
  };

  // go to edit screen
  const goToEditAITScreen = (item) => {
    console.log("hoal");
    navigation.navigate(screen.search.tab, {
      screen: screen.search.editAIT,
      params: { Item: item },
    });
  };

  return (
    <KeyboardAwareScrollView style={{ backgroundColor: "white" }}>
      <Text></Text>
      <Text style={styles.name}>{Item.NombreServicio}</Text>
      <Text></Text>
      {props.email === Item.emailPerfil && (
        <TouchableOpacity onPress={() => goToEditAITScreen(Item)}>
          <View style={{ marginRight: 10 }}>
            <ImageExpo
              source={require("../../../../assets/editIcon2.png")}
              style={styles.editIcon}
            />
          </View>
        </TouchableOpacity>
      )}
      {Item.photoServiceURL ? (
        <ImageExpo
          source={{ uri: Item.photoServiceURL }}
          style={styles.roundImage}
          cachePolicy={"memory-disk"}
        />
      ) : (
        <ImageExpo
          source={imageSource}
          style={styles.roundImage}
          cachePolicy={"memory-disk"}
        />
      )}

      <View>
        <Text></Text>

        <View style={[styles.row, styles.center]}>
          <Text style={styles.info}>{"Numero de AIT:  "}</Text>
          <Text style={styles.info2}>{Item.NumeroAIT}</Text>
        </View>

        <View style={[styles.row, styles.center]}>
          <Text style={styles.info}>{"Numero de Cotizacion:  "}</Text>
          <Text style={styles.info2}>{Item.NumeroCotizacion}</Text>
        </View>

        <View style={[styles.row, styles.center]}>
          <Text style={styles.info}>{"Tipo de Servicio:  "}</Text>
          <Text style={styles.info2}>{Item.TipoServicio}</Text>
        </View>

        <View style={[styles.row, styles.center]}>
          <Text style={styles.info}>{"Area del Servicio:  "}</Text>
          <Text style={styles.info2}>{Item.AreaServicio}</Text>
        </View>
        <View style={[styles.row, styles.center]}>
          <Text style={styles.info}>{"Nombre de la Empresa:  "}</Text>
          <Text style={styles.info2}>{Item.companyName}</Text>
        </View>
        <View style={[styles.row, styles.center]}>
          <Text style={styles.info}>{"Creado por:  "}</Text>
          <Text style={styles.info2}>{Item.emailPerfil}</Text>
        </View>
        <View style={[styles.row, styles.center]}>
          <Text style={styles.info}>{"Monto de Cotizacion:  "}</Text>
          <Text style={styles.info2}>
            {formattedAmount} {Item.Moneda}
          </Text>
        </View>
        <View style={[styles.row, styles.center]}>
          <Text style={styles.info}>{"Fecha de Asignacion:  "}</Text>
          <Text style={styles.info2}>
            {formatDate(Item?.createdAt?.seconds * 1000)}
          </Text>
        </View>
        <View style={[styles.row, styles.center]}>
          <Text style={styles.info}>{"Fecha de Fin Propuesto:  "}</Text>
          <Text style={styles.info2}>{NuevaFechaEstimadatoRender}</Text>
        </View>
        <View style={[styles.row, styles.center]}>
          <Text style={styles.info}>{"Horas Hombre Cotizadas:  "}</Text>
          <Text style={styles.info2}>
            {Item.HorasHombre}
            {" HH"}
          </Text>
        </View>
        <View style={[styles.row, styles.center]}>
          <Text style={styles.info}>{"Avance Ejecucion Real:  "}</Text>
          <Text style={styles.info2}>
            {Item.AvanceEjecucion}
            {" %"}
          </Text>
        </View>
        {BarProgress(Item.AvanceEjecucion)}

        <View style={[styles.row, styles.center]}>
          <Text style={styles.info}>{"Avance Ejecucion Proyectado:  "}</Text>
          <Text style={styles.info2}>
            {AvanceProyected.toFixed(2)}
            {" %"}
          </Text>
        </View>

        {BarProgress(AvanceProyected)}
        {/* 
        <View style={[styles.row, styles.center]}>
          <Text style={styles.info}>{"Avance Administrativo:  "}</Text>
          <Text style={styles.info2}>
            {Item.AvanceAdministrativo}
            {" %"}
          </Text>
        </View>

        {BarProgress(Item.AvanceAdministrativo)} */}

        <Text></Text>

        <Text style={styles.info}>{"Administradores de Contratos:  "}</Text>
        {ResposableList(ContratistaList)}

        <Text style={styles.info}>{"Supervisores Responsables:  "}</Text>
        {ResposableList(UsuarioList)}
      </View>
    </KeyboardAwareScrollView>
  );
}

const mapStateToProps = (reducers) => {
  return {
    email: reducers.profile.email,
  };
};

export const MoreDetailScreen = connect(mapStateToProps, {
  saveActualEquipment,
  EquipmentListUpper,
})(MoreDetailScreenNoRedux);
