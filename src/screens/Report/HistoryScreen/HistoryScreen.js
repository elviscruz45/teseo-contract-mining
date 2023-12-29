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
import { Modal } from "../../../components/shared/Modal";
import { ChangeDisplayCompany } from "../../../components/Forms/ReportScreen/ChangeCompany/ChangeCompany";

const HistoryScreenNoRedux = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const [company, setCompany] = useState("TOTAL CONTRATISTAS");
  const [companyList, setCompanyList] = useState();

  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  const update_Data = () => {
    setRenderComponent(
      <ChangeDisplayCompany
        onClose={onCloseOpenModal}
        setCompany={setCompany}
        companyList={companyList}
      />
    );
    setShowModal(true);
  };
  //real time updates
  const [data, setData] = useState([]);

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
  //Data about the company belong this event

  const regex = /@(.+?)\./i;
  const companyName = props.email?.match(regex)?.[1].toUpperCase() || "Anonimo"; // console.log("searchResults", searchResults);

  useEffect(() => {
    if (Array.isArray(props.servicesData)) {
      setCompanyList([
        ...new Set(props.servicesData.map((item) => item.companyName)),
      ]);
    }
  }, []);

  useEffect(() => {
    if (props.servicesData && company === "TOTAL CONTRATISTAS") {
      setData(props.servicesData);
    }
    if (company !== "TOTAL CONTRATISTAS") {
      setData(
        props.servicesData.filter(
          (item) => item.companyName?.toUpperCase() === company
        )
      );
    }
  }, [props.servicesData, removeFilter, company]);

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
    <>
      <ScrollView
        style={{ backgroundColor: "white" }} // Add backgroundColor here
        showsVerticalScrollIndicator={false}
      >
        <Text></Text>

        {companyName === "FMI" ? (
          <TouchableOpacity onPress={() => update_Data()}>
            <Image
              source={require("../../../../assets/empresa.png")}
              style={styles.roundImageUpload}
            />
          </TouchableOpacity>
        ) : (
          <Image
            source={require("../../../../assets/empresa.png")}
            style={styles.roundImageUpload}
          />
        )}

        {companyName !== "FMI" ? (
          <Text style={styles.company}>{companyName}</Text>
        ) : (
          <Text style={styles.company}>{company}</Text>
        )}

        <Text></Text>
        <Text></Text>

        <DateScreen
          filterButton={filter}
          quitFilterButton={() => quitfilter()}
        />

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
      <Modal show={showModal} close={onCloseOpenModal}>
        {renderComponent}
      </Modal>
    </>
  );
};

const mapStateToProps = (reducers) => {
  return {
    servicesData: reducers.home.servicesData,
    email: reducers.profile.email,
  };
};

export const HistoryScreen = connect(mapStateToProps, {})(HistoryScreenNoRedux);
