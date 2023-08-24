import { SelectList } from "react-native-dropdown-select-list";
import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Reparacion,
  Fabricacion,
  Ingenieria,
  IngenieriayFabricacion,
} from "../../../../utils/tipoServicioList";

const SelectExampleBare = (props) => {
  const [selected, setSelected] = useState("");
  const [list, setList] = useState([]);
  const { setText, formik } = props;

  //render the list the best suit depend of TipoServicio property
  let serviceType;
  if (props.actualServiceAIT.TipoServicio === "Reparacion") {
    serviceType = Reparacion;
  } else if (props.actualServiceAIT.TipoServicio === "Fabricacion") {
    serviceType = Fabricacion;
  } else if (props.actualServiceAIT.TipoServicio === "Ingenieria") {
    serviceType = Ingenieria;
  } else if (props.actualServiceAIT.TipoServicio === "IngenieriayFabricacion") {
    serviceType = IngenieriayFabricacion;
  } else {
    serviceType = [];
  }

  function saveProperty(itemValue) {
    setText(itemValue);
  }

  return (
    <SelectList
      setSelected={(val) => setSelected(val)}
      data={serviceType}
      save="value"
      maxHeight={150}
      onSelect={() => saveProperty(selected)}
    />
  );
};

const mapStateToProps = (reducers) => {
  return {
    actualServiceAIT: reducers.post.actualServiceAIT,
  };
};

export const SelectExample = connect(mapStateToProps, {})(SelectExampleBare);
