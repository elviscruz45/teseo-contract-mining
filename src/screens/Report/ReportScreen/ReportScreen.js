import React, { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { styles } from "./ReportScreen.styles";
import { RecursosProgress } from "../RecursosScreen/RecursosProgress";
import { PieChart } from "../RecursosScreen/PieStatus";
import { DateScreen } from "../../../components/Report/DateScreen/DateScreen";
import { BarChartMontoServicios } from "../RecursosScreen/BarChartMontoServicios";
import { BarChartProceso } from "../RecursosScreen/BarChartProceso";
import { ServiceList } from "../RecursosScreen/ServiceList";
import { InactiveServiceList } from "../RecursosScreen/InactiveServiceList";
import { MontoEDPList } from "../RecursosScreen/MontoEDPList";
import { MontoServiceList } from "../RecursosScreen/MontoServiceList";
import { RecursosHumanos } from "../RecursosScreen/RecursosHumanos";

const ReportScreenNoRedux = (props) => {
  console.log("5ReportScreen");
  //real time updates
  const [data, setData] = useState();
  //states of filters
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [removeFilter, setRemoveFilter] = useState(true);

  //states to view the tables
  const [serviciosActivos, setServiciosActivos] = useState(false);
  const [serviciosInactivos, setServiciosInactivos] = useState(false);
  const [montoServicios, setMontoServicios] = useState(false);
  const [montoEDP, setMontoEDP] = useState(false);

  useEffect(() => {
    console.log("5.USEEFFECTReportScreen");
    setData(props.ActualServiceAITList);
  }, [props.ActualServiceAITList]);

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

  return (
    <ScrollView
      style={{ backgroundColor: "white" }} // Add backgroundColor here
    >
      <Text></Text>
      <DateScreen filterButton={filter} quitFilterButton={() => quitfilter()} />
      <TouchableOpacity onPress={() => alert("lista de empresas")}>
        <Image
          source={require("../../../../assets/empresa.png")}
          style={styles.roundImageUpload}
        />
      </TouchableOpacity>
      <Text style={styles.company}>PRODISE</Text>
      <Text></Text>
      <RecursosHumanos />
      <Text></Text>
      <Text></Text>
      <View style={styles.container22}>
        <Text style={styles.titleText}>Servicios Activos Asignados</Text>
      </View>
      <Text></Text>
      <View style={styles.iconMinMax}>
        <TouchableOpacity onPress={() => setServiciosActivos(true)}>
          <Image
            source={require("../../../../assets/plus3.png")}
            style={styles.roundImageUploadmas}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setServiciosActivos(false)}>
          <Image
            source={require("../../../../assets/minus3.png")}
            style={styles.roundImageUploadmas}
          />
        </TouchableOpacity>
      </View>
      <PieChart data={data} />
      {serviciosActivos && <ServiceList data={data} />}
      <Text></Text>
      <Text></Text>
      <View style={styles.container22}>
        <Text style={styles.titleText}>Servicios Inactivos</Text>
      </View>
      <Text></Text>
      <View style={styles.iconMinMax}>
        <TouchableOpacity onPress={() => setServiciosInactivos(true)}>
          <Image
            source={require("../../../../assets/plus3.png")}
            style={styles.roundImageUploadmas}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setServiciosInactivos(false)}>
          <Image
            source={require("../../../../assets/minus3.png")}
            style={styles.roundImageUploadmas}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.iconMinMax}>
        <RecursosProgress
          cantidad={1}
          titulo={"Stan By"}
          unidad={"servicios"}
        />
        <RecursosProgress
          cantidad={1}
          titulo={"Cancelados"}
          unidad={"servicios"}
        />
      </Text>
      {serviciosInactivos && <InactiveServiceList data={data} />}
      <Text></Text>
      <Text></Text>
      <View style={styles.container22}>
        <Text style={styles.titleText}>Monto Servicios</Text>
      </View>
      <View style={styles.iconMinMax}>
        <TouchableOpacity onPress={() => setMontoServicios(true)}>
          <Image
            source={require("../../../../assets/plus3.png")}
            style={styles.roundImageUploadmas}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setMontoServicios(false)}>
          <Image
            source={require("../../../../assets/minus3.png")}
            style={styles.roundImageUploadmas}
          />
        </TouchableOpacity>
      </View>
      <BarChartMontoServicios data={data} />
      {montoServicios && <MontoServiceList data={data} />}
      <Text></Text>
      <View style={styles.container22}>
        <Text style={styles.titleText}>Monto Estado de Pago</Text>
      </View>
      <Text></Text>
      <View style={styles.iconMinMax}>
        <TouchableOpacity onPress={() => setMontoEDP(true)}>
          <Image
            source={require("../../../../assets/plus3.png")}
            style={styles.roundImageUploadmas}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setMontoEDP(false)}>
          <Image
            source={require("../../../../assets/minus3.png")}
            style={styles.roundImageUploadmas}
          />
        </TouchableOpacity>
      </View>
      <BarChartProceso data={data} />
      {montoEDP && <MontoEDPList data={data} />}
    </ScrollView>
  );
};

const mapStateToProps = (reducers) => {
  return {
    // firebase_user_name: reducers.profile.firebase_user_name,
    // user_photo: reducers.profile.user_photo,
    // email: reducers.profile.email,
    // profile: reducers.profile.profile,
    // uid: reducers.profile.uid,
    // equipmentListHeader: reducers.home.equipmentList,
    ActualServiceAITList: reducers.post.ActualServiceAITList,
    totalEventServiceAITLIST: reducers.home.totalEventServiceAITLIST,
    ActualPostFirebase: reducers.post.ActualPostFirebase,
  };
};

export const ReportScreen = connect(mapStateToProps, {
  // EquipmentListUpper,
  // saveActualAITServicesFirebaseGlobalState,
})(ReportScreenNoRedux);
