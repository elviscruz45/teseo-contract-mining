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

export function validationSchema() {
  return Yup.object({
    // TotalReparacion: Yup.string().required("Dato requerido"),
    // Reparacion: Yup.string().required("Dato requerido"),
    // TotalFabricacion: Yup.string().required("Dato requerido"),
    // Fabricacion: Yup.string().required("Dato requerido"),
    // TotalIngenieria: Yup.string().required("Dato requerido"),
    // Ingenieria: Yup.string().required("Dato requerido"),
    // TotalMaquinado: Yup.string().required("Dato requerido"),
    // Maquinado: Yup.string().required("Dato requerido"),
  });
}
