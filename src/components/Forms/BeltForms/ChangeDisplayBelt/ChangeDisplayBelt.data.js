import * as Yup from "yup";

export function initialValues() {
  return {
    Plant: "-",
    Number1: "-",
    Number2: "-",
  };
}

export function validationSchema() {
  return Yup.object({
    Plant: Yup.string().required("Selecciona una Faja"),
    Number1: Yup.string().required("Selecciona una Numero"),
    Number2: Yup.string().required("Selecciona una Numero"),
  });
}
