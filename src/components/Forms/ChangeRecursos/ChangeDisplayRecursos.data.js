import * as Yup from "yup";

export function initialValues() {
  return {
    recursos: "",
  };
}

export function validationSchema() {
  return Yup.object({
    recursos: Yup.string().required("Seleccione un recurso"),
  });
}
