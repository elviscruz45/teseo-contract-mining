import React, { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { styles } from "./HistoryScreen.styles";
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
import { BarInactiveServices } from "../RecursosScreen/BarInactiveServices";
import { MontoComprometido } from "../RecursosScreen/MontoComprometido";
import { getExcelReportData } from "../../../utils/excelData";
import { HistoryEstadoServiceList } from "../RecursosScreen/HistoryEstadoServiceList";
import { HistoryServiceList } from "../RecursosScreen/HistoryServiceList";
import { db } from "../../../utils";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  limit,
} from "firebase/firestore";

const HistoryScreenNoRedux = (props) => {
  //real time updates
  const [data, setData] = useState([]);
  console.log("5.ReportScreen", data);

  //states of filters
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [removeFilter, setRemoveFilter] = useState(true);

  //states to view the tables
  const [serviciosActivos, setServiciosActivos] = useState(false);
  const [estadoServicios, setEstadoServicios] = useState(false);
  const [serviciosInactivos, setServiciosInactivos] = useState(false);
  const [montoServicios, setMontoServicios] = useState(false);
  const [historial, setHistorial] = useState(false);

  useEffect(() => {
    if (props.servicesData) {
      setData(props.servicesData);
    }
  }, [props.servicesData, removeFilter]);

  useEffect(() => {
    let unsubscribe;
    let q;
    if (startDate && endDate) {
      async function fetchData() {
        q = query(
          collection(db, "ServiciosAIT"),
          orderBy("createdAt", "desc"),
          where("createdAt", ">=", startDate),
          where("createdAt", "<=", endDate)
        );

        try {
          const querySnapshot = await getDocs(q);
          const lista = [];
          querySnapshot.forEach((doc) => {
            lista.push(doc.data());
          });
          console.log("GETDOCquerySnapshotHistoryScreenNoRedux");

          setData(lista);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      }

      fetchData();

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [startDate, endDate]);

  //Changing the value to activate again the filter to rende the posts
  const filter = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };
  const quitfilter = () => {
    setRemoveFilter((prev) => !prev);
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <ScrollView
      style={{ backgroundColor: "white" }} // Add backgroundColor here
    >
      <Text></Text>
      <TouchableOpacity onPress={() => alert("lista de empresas")}>
        <Image
          source={require("../../../../assets/empresa.png")}
          style={styles.roundImageUpload}
        />
      </TouchableOpacity>

      <Text style={styles.company}>PRODISE</Text>
      <Text></Text>
      <Text></Text>

      <DateScreen filterButton={filter} quitFilterButton={() => quitfilter()} />

      <Text></Text>
      <Text></Text>

      <Text></Text>
      <View style={styles.iconMinMax}>
        <View style={styles.container22}>
          <Text style={styles.titleText}>Historial Tipo Servicios </Text>
        </View>
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
      <View style={styles.iconMinMax}>
        <View style={styles.container22}>
          <Text style={styles.titleText}>Fecha Historial Servicios</Text>
        </View>
        <TouchableOpacity onPress={() => setEstadoServicios(true)}>
          <Image
            source={require("../../../../assets/plus3.png")}
            style={styles.roundImageUploadmas}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setEstadoServicios(false)}>
          <Image
            source={require("../../../../assets/minus3.png")}
            style={styles.roundImageUploadmas}
          />
        </TouchableOpacity>
      </View>
      {estadoServicios && <HistoryServiceList data={data} />}

      <Text></Text>
      <Text></Text>
      <View style={styles.iconMinMax}>
        <View style={styles.container22}>
          <Text style={styles.titleText}>Estado Historial Servicios</Text>
        </View>
        <TouchableOpacity onPress={() => setHistorial(true)}>
          <Image
            source={require("../../../../assets/plus3.png")}
            style={styles.roundImageUploadmas}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setHistorial(false)}>
          <Image
            source={require("../../../../assets/minus3.png")}
            style={styles.roundImageUploadmas}
          />
        </TouchableOpacity>
      </View>
      {historial && <HistoryEstadoServiceList data={data} />}
      <Text></Text>
      <Text></Text>
      <View style={styles.iconMinMax}>
        <View style={styles.container22}>
          <Text style={styles.titleText}>Servicios Inactivos</Text>
        </View>
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
      <Text></Text>

      {serviciosInactivos && (
        <>
          <Text style={{ margin: 10 }}>
            <BarInactiveServices
              data={data}
              titulo={"Stand by"}
              unidad={"servicios"}
            />
          </Text>
          <Text style={{ marginLeft: 10 }}>
            <BarInactiveServices
              data={data}
              titulo={"Cancelacion"}
              unidad={"servicios"}
            />
          </Text>
          <InactiveServiceList data={data} />
        </>
      )}
      <Text></Text>

      <View style={styles.iconMinMax}>
        <View style={styles.container22}>
          <Text style={styles.titleText}>Monto Servicios</Text>
        </View>
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
      {montoServicios && (
        <>
          {/* <BarChartMontoServicios data={data} /> */}
          <MontoServiceList data={data} />
        </>
      )}
      <Text></Text>

      <Text></Text>

      <TouchableOpacity
        // style={styles.btnContainer4}
        onPress={
          () => getExcelReportData(data)
          // alert("Pendiente todavia")
        }
      >
        <Image
          source={require("../../../../assets/excel2.png")}
          style={styles.roundImageUpload}
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

const mapStateToProps = (reducers) => {
  return {
    servicesData: reducers.home.servicesData,
  };
};

export const HistoryScreen = connect(mapStateToProps, {})(HistoryScreenNoRedux);
