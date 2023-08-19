import * as Yup from "yup";

export function initialValues() {
  return {
    TotalReparacion: "",
    Reparacion: "",
    TotalFabricacion: "",
    Fabricacion: "",
    TotalIngenieria: "",
    Ingenieria: "",
    TotalMaquinado: "",
    Maquinado: "",
  };
}

// export function validationSchema() {
//   return Yup.object({
//     TotalReparacion: Yup.string().required("Dato requerido"),
//     Reparacion: Yup.string().required("Dato requerido"),
//     TotalFabricacion: Yup.string().required("Dato requerido"),
//     Fabricacion: Yup.string().required("Dato requerido"),
//     TotalIngenieria: Yup.string().required("Dato requerido"),
//     Ingenieria: Yup.string().required("Dato requerido"),
//     TotalMaquinado: Yup.string().required("Dato requerido"),
//     Maquinado: Yup.string().required("Dato requerido"),
//   });
// }

// Function to handle validation and display an alert
export function handleValidation(values) {
  const { TotalReparacion, Reparacion } = values;

  if (TotalReparacion !== "" && Reparacion !== "") {
    if (parseInt(TotalReparacion) <= parseInt(Reparacion)) {
      Alert.alert(
        "Validation Error",
        "TotalReparacion should be greater than Reparacion",
        [{ text: "OK", onPress: () => {} }]
      );
    }
  }
}
