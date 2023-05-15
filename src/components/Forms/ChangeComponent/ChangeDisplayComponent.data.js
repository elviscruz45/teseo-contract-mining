import * as Yup from "yup";

export function initialValues() {
  return {
    Componente: "",
  };
}

export function validationSchema() {
  return Yup.object({
    Componente: Yup.string().required("Selecciona un componente"),
  });
}
