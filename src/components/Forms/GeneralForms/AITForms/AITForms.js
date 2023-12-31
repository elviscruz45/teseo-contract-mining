import { View, Text, Linking, Button } from "react-native";
import React, { useState } from "react";
import { styles } from "./AITForms.styles";
import { Input } from "@rneui/themed";
import { Modal } from "../../../shared/Modal/Modal";
import { ChangeDisplaynumeroAIT } from "../../FormsAIT/ChangeNumeroAIT/ChangeDisplayNumeroAIT";
import { ChangeDisplayArea } from "../../FormsAIT/ChangeArea/ChangeDisplayArea";
import { ChangeDisplayTipoServicio } from "../../FormsAIT/ChangeTipoServicio/ChangeDisplayTipoServicio";
import { ChangeDisplayAdminContracts } from "../../FormsAIT/ChangeContratos/ChangeDisplayContratos";
import { ChangeDisplayAdminContratista } from "../../FormsAIT/ChangeContratista/ChangeDisplayContratista";
import { ChangeDisplaynumeroCot } from "../../FormsAIT/ChangeNumeroCot/ChangeDisplayNumeroCot";
import { ChangeDisplayMonto } from "../../FormsAIT/ChangeNumeroMonto/ChangeDisplayMonto";
import { ChangeDisplayHH } from "../../FormsAIT/ChangeNumeroHH/ChangeDisplayHH";
import { ChangeDisplayMoneda } from "../../FormsAIT/ChangeMoneda/ChangeDisplayTipoServicio";
import { ChangeDisplayFechaFin } from "../../FormsAIT/ChangeFechaFin/ChangeDisplayFechaFin";
export function AITForms(props) {
  const { formik, setTituloserv, setAit, setTiposerv, setArea } = props;
  const [renderComponent, setRenderComponent] = useState(null);

  //state of displays
  const [numeroAIT, setnumeroAIT] = useState(null);
  const [areaservicio, setAreaservicio] = useState(null);
  const [tiposervicio, setTiposervicio] = useState(null);
  const [responsableempresausuario, setResponsableempresausuario] =
    useState(null);
  const [responsableempresacontratista, setResponsableempresacontratista] =
    useState(null);
  const [fechafin, setFechafin] = useState(null);
  const [numerocotizacion, setNumerocotizacion] = useState(null);
  const [moneda, setMoneda] = useState(null);
  const [monto, setMonto] = useState(null);
  const [horashombre, setHorashombre] = useState(null);

  //open or close modal
  const [showModal, setShowModal] = useState(false);
  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  const selectComponent = (key) => {
    if (key === "NumeroAIT") {
      setRenderComponent(
        <ChangeDisplaynumeroAIT
          onClose={onCloseOpenModal}
          formik={formik}
          setnumeroAIT={setnumeroAIT}
          setAit={setAit}
        />
      );
    }
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
    if (key === "ResponsableEmpresaContratista") {
      setRenderComponent(
        <ChangeDisplayAdminContratista
          onClose={onCloseOpenModal}
          formik={formik}
          setResponsableempresacontratista={setResponsableempresacontratista}
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
          value={numeroAIT}
          placeholder="Numero AIT"
          editable={false}
          errorMessage={formik.errors.NumeroAIT}
          rightIcon={{
            type: "material-community",
            name: "numeric",
            // color: getColorIconMap(formik),
            onPress: () => selectComponent("NumeroAIT"),
          }}
        />
        <Text style={styles.subtitleForm}>Detalles del Servicio:</Text>

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
          placeholder="Responsables del Seguimiento Empresa Usuaria"
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
          value={responsableempresacontratista}
          placeholder="Responsables del Seguimiento Empresa Contratista"
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
          value={fechafin}
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
        <Text style={styles.subtitleForm}>Alcance del Servicio:</Text>
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
          value={monto}
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
          value={horashombre}
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
