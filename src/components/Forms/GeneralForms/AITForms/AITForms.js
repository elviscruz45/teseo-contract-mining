import { View, Text, Linking, Button } from "react-native";
import React, { useState } from "react";
import { styles } from "./AITForms.styles";
import { Input } from "@rneui/themed";
import { Modal } from "../../../shared/Modal/Modal";
import { ChangeDisplayArea } from "../../FormsAIT/ChangeArea/ChangeDisplayArea";
import { ChangeDisplayTipoServicio } from "../../FormsAIT/ChangeTipoServicio/ChangeDisplayTipoServicio";
import { ChangeDisplayAdminContracts } from "../../FormsAIT/ChangeContratos/ChangeDisplayContratos";
import { ChangeDisplayAdminContracts2 } from "../../FormsAIT/ChangeContratos2/ChangeDisplayContratos2";
import { ChangeDisplayAdminContracts3 } from "../../FormsAIT/ChangeContratos3/ChangeDisplayContratos3";
import { ChangeDisplayAdminContratista } from "../../FormsAIT/ChangeContratista/ChangeDisplayContratista";
import { ChangeDisplayAdminContratista2 } from "../../FormsAIT/ChangeContratista2/ChangeDisplayContratista2";
import { ChangeDisplayAdminContratista3 } from "../../FormsAIT/ChangeContratista3/ChangeDisplayContratista3";
import { ChangeDisplaynumeroCot } from "../../FormsAIT/ChangeNumeroCot/ChangeDisplayNumeroCot";
import { ChangeDisplayMonto } from "../../FormsAIT/ChangeNumeroMonto/ChangeDisplayMonto";
import { ChangeDisplayHH } from "../../FormsAIT/ChangeNumeroHH/ChangeDisplayHH";
import { ChangeDisplayMoneda } from "../../FormsAIT/ChangeMoneda/ChangeDisplayTipoServicio";
import { ChangeDisplayFechaFin } from "../../FormsAIT/ChangeFechaFin/ChangeDisplayFechaFin";
import { ChangeDisplayFechaInicio } from "../../FormsAIT/ChangeFechaInicio/ChangeDisplayFechaInicio";
export function AITForms(props) {
  const { formik, setTituloserv, setAit, setTiposerv, setArea } = props;
  const [renderComponent, setRenderComponent] = useState(null);

  //state to render the header

  //state of displays
  const [numeroAIT, setnumeroAIT] = useState(null);
  const [areaservicio, setAreaservicio] = useState(null);
  const [tiposervicio, setTiposervicio] = useState(null);
  const [responsableempresausuario, setResponsableempresausuario] =
    useState(null);
  const [responsableempresausuario2, setResponsableempresausuario2] =
    useState(null);
  const [responsableempresausuario3, setResponsableempresausuario3] =
    useState(null);

  const [responsableempresacontratista, setResponsableempresacontratista] =
    useState(null);

  const [responsableempresacontratista2, setResponsableempresacontratista2] =
    useState(null);

  const [responsableempresacontratista3, setResponsableempresacontratista3] =
    useState(null);
  const [fechafin, setFechafin] = useState(null);
  const [fechaInicio, setFechaInicio] = useState(null);
  const [numerocotizacion, setNumerocotizacion] = useState(null);
  const [moneda, setMoneda] = useState(null);
  const [monto, setMonto] = useState(null);
  const [horashombre, setHorashombre] = useState(null);

  //open or close modal
  const [showModal, setShowModal] = useState(false);
  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  ///function to date format
  const formatdate = (item) => {
    const date = new Date(item);
    const monthNames = [
      "de enero del",
      "de febrero del",
      "de marzo del",
      "de abril del",
      "de mayo del",
      "de junio del",
      "de julio del",
      "de agosto del",
      "de septiembre del",
      "de octubre del",
      "de noviembre del",
      "de diciembre del",
    ];
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const formattedDate = `${day} ${month} ${year} `;
    const fechaPostFormato = formattedDate;
    if (!item) {
      return;
    } else {
      return fechaPostFormato;
    }
  };

  //function to format money
  const formatNumber = (item) => {
    const amount = item;

    const formattedAmount = new Intl.NumberFormat("en-US").format(amount);
    if (!item) {
      return;
    } else {
      return formattedAmount;
    }
  };

  const selectComponent = (key) => {
    if (key === "AreaServicio") {
      setRenderComponent(
        <ChangeDisplayArea
          onClose={onCloseOpenModal}
          formik={formik}
          setAreaservicio={setAreaservicio}
          setArea={setArea}
        />
      );
    }
    if (key === "TipoServicio") {
      setRenderComponent(
        <ChangeDisplayTipoServicio
          onClose={onCloseOpenModal}
          formik={formik}
          setTiposervicio={setTiposervicio}
          setTiposerv={setTiposerv}
        />
      );
    }
    if (key === "ResponsableEmpresaUsuario") {
      setRenderComponent(
        <ChangeDisplayAdminContracts
          onClose={onCloseOpenModal}
          formik={formik}
          setResponsableempresausuario={setResponsableempresausuario}
        />
      );
    }
    if (key === "ResponsableEmpresaUsuario2") {
      setRenderComponent(
        <ChangeDisplayAdminContracts2
          onClose={onCloseOpenModal}
          formik={formik}
          setResponsableempresausuario2={setResponsableempresausuario2}
        />
      );
    }
    if (key === "ResponsableEmpresaUsuario3") {
      setRenderComponent(
        <ChangeDisplayAdminContracts3
          onClose={onCloseOpenModal}
          formik={formik}
          setResponsableempresausuario3={setResponsableempresausuario3}
        />
      );
    }

    if (key === "ResponsableEmpresaContratista") {
      setRenderComponent(
        <ChangeDisplayAdminContratista
          onClose={onCloseOpenModal}
          formik={formik}
          setResponsableempresacontratista={setResponsableempresacontratista}
        />
      );
    }

    if (key === "ResponsableEmpresaContratista2") {
      setRenderComponent(
        <ChangeDisplayAdminContratista2
          onClose={onCloseOpenModal}
          formik={formik}
          setResponsableempresacontratista2={setResponsableempresacontratista2}
        />
      );
    }

    if (key === "ResponsableEmpresaContratista3") {
      setRenderComponent(
        <ChangeDisplayAdminContratista3
          onClose={onCloseOpenModal}
          formik={formik}
          setResponsableempresacontratista3={setResponsableempresacontratista3}
        />
      );
    }

    if (key === "FechaInicio") {
      setRenderComponent(
        <ChangeDisplayFechaInicio
          onClose={onCloseOpenModal}
          formik={formik}
          setFechaInicio={setFechaInicio}
        />
      );
    }
    if (key === "FechaFin") {
      setRenderComponent(
        <ChangeDisplayFechaFin
          onClose={onCloseOpenModal}
          formik={formik}
          setFechafin={setFechafin}
        />
      );
    }
    if (key === "NumeroCotizacion") {
      setRenderComponent(
        <ChangeDisplaynumeroCot
          onClose={onCloseOpenModal}
          formik={formik}
          setNumerocotizacion={setNumerocotizacion}
        />
      );
    }
    if (key === "Moneda") {
      setRenderComponent(
        <ChangeDisplayMoneda
          onClose={onCloseOpenModal}
          formik={formik}
          setMoneda={setMoneda}
        />
      );
    }
    if (key === "Monto") {
      setRenderComponent(
        <ChangeDisplayMonto
          onClose={onCloseOpenModal}
          formik={formik}
          setMonto={setMonto}
        />
      );
    }
    if (key === "HorasHombre") {
      setRenderComponent(
        <ChangeDisplayHH
          onClose={onCloseOpenModal}
          formik={formik}
          setHorashombre={setHorashombre}
        />
      );
    }
    onCloseOpenModal();
  };

  return (
    <View>
      <View style={styles.content}>
        <Input
          placeholder="Nombre del Servicio"
          onChangeText={(text) => {
            formik.setFieldValue("NombreServicio", text);
            setTituloserv(text);
          }}
          errorMessage={formik.errors.NombreServicio}
        />
        <Input
          placeholder="Numero Servicio"
          onChangeText={(text) => {
            formik.setFieldValue("NumeroAIT", text);
            setAit(text);
          }}
          errorMessage={formik.errors.NumeroAIT}
        />

        <Text style={styles.subtitleForm}>Detalles del Servicio</Text>

        <Input
          value={areaservicio}
          placeholder="Area del Servicio a Realizar"
          editable={false}
          errorMessage={formik.errors.AreaServicio}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => selectComponent("AreaServicio"),
          }}
        />
        <Input
          value={tiposervicio}
          placeholder="Tipo de Servicio"
          editable={false}
          errorMessage={formik.errors.TipoServicio}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => selectComponent("TipoServicio"),
          }}
        />
        <Input
          value={responsableempresausuario}
          placeholder="Administrador de Contrato Usuario Responsable"
          multiline={true}
          editable={false}
          errorMessage={formik.errors.ResponsableEmpresaUsuario}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => selectComponent("ResponsableEmpresaUsuario"),
          }}
        />
        <Input
          value={responsableempresausuario2}
          placeholder="Planeamiento Usuario Responsable"
          multiline={true}
          editable={false}
          errorMessage={formik.errors.ResponsableEmpresaUsuario}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => selectComponent("ResponsableEmpresaUsuario2"),
          }}
        />
        <Input
          value={responsableempresausuario3}
          placeholder="Mantenimiento Usuario Responsable"
          multiline={true}
          editable={false}
          errorMessage={formik.errors.ResponsableEmpresaUsuario}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => selectComponent("ResponsableEmpresaUsuario3"),
          }}
        />

        <Input
          value={responsableempresacontratista}
          placeholder="Gerente Contratista"
          multiline={true}
          editable={false}
          errorMessage={formik.errors.ResponsableEmpresaContratista}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => selectComponent("ResponsableEmpresaContratista"),
          }}
        />

        <Input
          value={responsableempresacontratista2}
          placeholder="Planificador Contratista"
          multiline={true}
          editable={false}
          errorMessage={formik.errors.ResponsableEmpresaContratista}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => selectComponent("ResponsableEmpresaContratista2"),
          }}
        />

        <Input
          value={responsableempresacontratista3}
          placeholder="Supervisor Contratista"
          multiline={true}
          editable={false}
          errorMessage={formik.errors.ResponsableEmpresaContratista}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => selectComponent("ResponsableEmpresaContratista3"),
          }}
        />

        <Input
          value={formatdate(fechaInicio)}
          placeholder="Fecha de Inicio"
          multiline={true}
          editable={false}
          errorMessage={formik.errors.FechaInicio}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => selectComponent("FechaInicio"),
          }}
        />
        <Input
          value={formatdate(fechafin)}
          placeholder="Fecha de Fin Comprometida"
          multiline={true}
          editable={false}
          errorMessage={formik.errors.FechaFin}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => selectComponent("FechaFin"),
          }}
        />
        <Text style={styles.subtitleForm}>Alcance del Servicio</Text>
        <Input
          value={numerocotizacion}
          placeholder="Numero de Cotizacion"
          editable={false}
          errorMessage={formik.errors.NumeroCotizacion}
          rightIcon={{
            type: "material-community",
            name: "numeric",
            // color: getColorIconMap(formik),
            onPress: () => selectComponent("NumeroCotizacion"),
          }}
        />
        <Input
          value={moneda}
          placeholder="Moneda"
          editable={false}
          errorMessage={formik.errors.Moneda}
          rightIcon={{
            type: "material-community",
            name: "arrow-right-circle-outline",
            onPress: () => selectComponent("Moneda"),
          }}
        />
        <Input
          value={formatNumber(monto)}
          placeholder="Monto Total"
          editable={false}
          errorMessage={formik.errors.Monto}
          rightIcon={{
            type: "material-community",
            name: "numeric",
            // color: getColorIconMap(formik),
            onPress: () => selectComponent("Monto"),
          }}
        />

        <Input
          value={formatNumber(horashombre)}
          placeholder="Horas Hombre"
          editable={false}
          errorMessage={formik.errors.HorasHombre}
          rightIcon={{
            type: "material-community",
            name: "numeric",
            // color: getColorIconMap(formik),
            onPress: () => selectComponent("HorasHombre"),
          }}
        />
      </View>

      <Modal show={showModal} close={onCloseOpenModal}>
        {renderComponent}
      </Modal>
    </View>
  );
}
