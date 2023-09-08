import * as Yup from "yup";

export function initialValues() {
  return {
    equipoTrabajo: "",
  };
}

export function validationSchema() {
  return Yup.object({
    equipoTrabajo: Yup.string().required("Seleccione al menos uno"),
  });
}
