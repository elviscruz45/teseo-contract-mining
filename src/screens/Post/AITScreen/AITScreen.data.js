import * as Yup from "yup";
export function initialValues() {
  return {
    NombreServicio: "",
    NumeroAIT: "",
    AreaServicio: "",
    TipoServicio: "",
    ResponsableEmpresaUsuario: "",
    ResponsableEmpresaUsuario2: "",
    ResponsableEmpresaUsuario3: "",
    ResponsableEmpresaContratista: "",
    ResponsableEmpresaContratista2: "",
    ResponsableEmpresaContratista3: "",
    FechaInicio: null,
    FechaFin: null,
    NumeroCotizacion: "",
    Moneda: "",
    Monto: "",
    HorasHombre: "",
    pdfFile: [],
  };
}

export function validationSchema() {
  return Yup.object({
    NombreServicio: Yup.string().required("Campo obligatorio"),
    NumeroAIT: Yup.string().required("Campo obligatorio"),
    AreaServicio: Yup.string().required("Campo obligatorio"),
    TipoServicio: Yup.string().required("Campo obligatorio"),
    ResponsableEmpresaUsuario: Yup.string().required("Campo obligatorio"),
    ResponsableEmpresaContratista: Yup.string().required("Campo obligatorio"),
    FechaInicio: Yup.date().required("Campo obligatorio"),
    FechaFin: Yup.date().required("Campo obligatorio"),
    NumeroCotizacion: Yup.string().required("Campo obligatorio"),
    Moneda: Yup.string().required("Campo obligatorio"),
    Monto: Yup.string().required("Campo obligatorio"),
    HorasHombre: Yup.string().required("Campo obligatorio"),
  });
}
