import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

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

export const ReportScreen = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [removeFilter, setRemoveFilter] = useState(true);

  //states to view the tables
  const [serviciosActivos, setServiciosActivos] = useState(false);
  const [serviciosInactivos, setServiciosInactivos] = useState(false);
  const [montoServicios, setMontoServicios] = useState(false);
  const [montoEDP, setMontoEDP] = useState(false);

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
      <PieChart />
      {serviciosActivos && <ServiceList />}
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
          cantidad={5}
          titulo={"Stan By"}
          unidad={"servicios"}
        />
        <RecursosProgress
          cantidad={10}
          titulo={"Cancelados"}
          unidad={"servicios"}
        />
      </Text>
      {serviciosInactivos && <InactiveServiceList />}
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
      <BarChartMontoServicios />
      {montoServicios && <MontoServiceList />}
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
      <BarChartProceso />
      {montoEDP && <MontoEDPList />}
    </ScrollView>
  );
};
