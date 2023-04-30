import * as Yup from "yup";

export function initialValues() {
  return {
    Number1: "",
    Number2: "20",
  };
}

export function validationSchema() {
  return Yup.object({
    Plant: Yup.string().required("Selecciona una Faja"),
    Number1: Yup.string().required("Selecciona una Numero"),
    Number2: Yup.string().required("Selecciona una Numero"),
  });
}
