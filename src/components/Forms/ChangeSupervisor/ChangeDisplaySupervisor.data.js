import * as Yup from "yup";

export function initialValues() {
  return {
    Supervisor: "",
  };
}

export function validationSchema() {
  return Yup.object({
    Supervisor: Yup.string().required("Seleccione al supervisor"),
  });
}
