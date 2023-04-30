import * as Yup from "yup";

export function initialValues() {
  return {
    Priority: "3_Normal",
  };
}

export function validationSchema() {
  return Yup.object({
    Zone: Yup.string().required("Selecciona una Faja"),
    Number1: Yup.string().required("Selecciona una Numero"),
    Number2: Yup.string().required("Selecciona una Numero"),
  });
}
