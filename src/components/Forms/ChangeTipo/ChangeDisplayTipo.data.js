import * as Yup from "yup";

export function initialValues() {
  return {
    tipo: "",
  };
}

export function validationSchema() {
  return Yup.object({
    tipo: Yup.string().required("Seleccione un tipo"),
  });
}
