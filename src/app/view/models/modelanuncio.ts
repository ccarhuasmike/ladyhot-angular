export class FormData {
    //Datos Contacto
    txt_nombre: string = '';
    txt_telefono1: string = '';
    txt_telefono2: string = '';
    txt_email: string = '';
    txt_web: string = '';
    txt_descripcion_contacto: string = '';
    //Datos Generales
    cbo_edad: string = '';
    cbo_pais_origen: string = '';
    cbo_estudio: string = '';
    txt_descripcion_generales: string = '';
    //Apariencia
    cbo_cabello: string = '';
    cbo_ojos: string = '';
    cbo_estatura: string = '';
    cbo_peso: string = '';
    txt_busto: string = '';
    txt_cintura: string = '';
    txt_cadera: string = '';
    txt_descripcion_apariencia: string = '';
    txt_medidas_busto_cintura_cadera: string = '';
    //Tarifa 
    txt_30_min: number = 0;
    txt_45_min: number = 0;
    txt_1_hora: number = 0;
    txt_1_30_hora: number = 0;
    txt_2_hora: number = 0;
    txt_3_hora: number = 0;
    txt_salida: number = 0;
    txt_toda_noche: number = 0;
    txt_viajes: number = 0;
    txt_descripcion_tarifas: string = ''
    ListFormaPago: ModelCarga[]

    ListDistrito: ModelCarga[];
    ListLugar: ModelCarga[];
    ListServicios: ModelCarga[];
    algosobredisponibilidad: string = '';
    txt_descripcion_servicios: string = '';
    flagatiende24horas: boolean = false;

    // clear() {
    //     this.txt_nombre = '';
    //     this.txt_telefono1 = '';
    //     this.txt_telefono2 = '';
    //     this.txt_email = '';
    //     this.txt_web = '';
    //     this.cbo_edad = '';
    //     this.cbo_pais_origen = '';
    //     this.cbo_estudio = '';
    //     this.txt_descripcion_generales = '';
    //     this.cbo_cabello = '';
    //     this.cbo_ojos = '';
    //     this.cbo_estatura = '';
    //     this.cbo_peso = '';
    //     this.txt_busto = '';
    //     this.txt_cintura = '';
    //     this.txt_cadera = '';
    //     this.txt_descripcion_apariencia = '';

    //     this.txt_30_min = 0;
    //     this.txt_45_min = 0;
    //     this.txt_1_hora = 0;
    //     this.txt_1_30_hora = 0;
    //     this.txt_2_hora = 0;
    //     this.txt_3_hora = 0;
    //     this.txt_salida = 0;
    //     this.txt_toda_noche = 0;
    //     this.txt_viajes = 0;
    //     this.txt_descripcion_tarifas = '';

    //     this.algosobredisponibilidad = '';
    //     this.txt_descripcion_servicios = '';
    //     this.flagatiende24horas = false;

    // }
}

export class DatosContacto {
    txt_nombre: string = '';
    txt_telefono1: string = '';
    txt_telefono2: string = '';
    txt_email: string = '';
    txt_web: string = '';
    txt_descripcion_contacto: string = '';
}

export class DatosGenerales implements DatosContacto, Apariencia, Tarifas, Servicios {
    //Datos de Contacto
    txt_nombre: string = '';
    txt_telefono1: string = '';
    txt_telefono2: string = '';
    txt_email: string = '';
    txt_web: string = '';
    txt_descripcion_contacto: string = '';
    //Datos Generales
    cbo_edad: string = '';
    cbo_pais_origen: string = '';
    cbo_estudio: string = '';
    txt_descripcion_generales: string = '';
    //Datos Apariencia
    cbo_cabello: string = '';
    cbo_ojos: string = '';
    cbo_estatura: string = '';
    cbo_peso: string = '';
    txt_busto: string = '';
    txt_cintura: string = '';
    txt_cadera: string = '';
    txt_descripcion_apariencia: string = '';
    //Datos Tarifas
    txt_30_min: number = 0;
    txt_45_min: number = 0;
    txt_1_hora: number = 0;
    txt_1_30_hora: number = 0;
    txt_2_hora: number = 0;
    txt_3_hora: number = 0;
    txt_salida: number = 0;
    txt_toda_noche: number = 0;
    txt_viajes: number = 0;
    ListFormaPago: ModelCarga[] = new Array<ModelCarga>();
    txt_descripcion_tarifas: string = '';
    //Datos Servicios
    ListDistrito: ModelCarga[] = new Array<ModelCarga>();
    flagatiende24horas: boolean = false;
    algosobredisponibilidad: string = '';
    ListLugar: ModelCarga[] = new Array<ModelCarga>();
    ListServicios: ModelCarga[] = new Array<ModelCarga>();
    txt_descripcion_servicios: string = '';
}

export class Apariencia {
    cbo_cabello: string = '';
    cbo_ojos: string = '';
    cbo_estatura: string = '';
    cbo_peso: string = '';
    txt_busto: string = '';
    txt_cintura: string = '';
    txt_cadera: string = '';
    txt_descripcion_apariencia: string = '';
}

export class Tarifas {
    txt_30_min: number = 0;
    txt_45_min: number = 0;
    txt_1_hora: number = 0;
    txt_1_30_hora: number = 0;
    txt_2_hora: number = 0;
    txt_3_hora: number = 0;
    txt_salida: number = 0;
    txt_toda_noche: number = 0;
    txt_viajes: number = 0;
    txt_descripcion_tarifas: string = '';
    ListFormaPago: ModelCarga[] = new Array<ModelCarga>();
}


export class Servicios {
    ListDistrito: ModelCarga[] = new Array<ModelCarga>();
    ListLugar: ModelCarga[] = new Array<ModelCarga>();
    ListServicios: ModelCarga[] = new Array<ModelCarga>();
    algosobredisponibilidad: string = '';
    txt_descripcion_servicios: string = '';
    flagatiende24horas: boolean = false;
}
// export class Galeria {
//     Imgen1: Fileinput;
//     Imgen2: Fileinput;
//     Imgen3: Fileinput;
//     Imgen4: Fileinput;
//     Imgen5: Fileinput;
//     Imgen6: Fileinput;
// }
// export class Fileinput {
//     filename: string = '';
//     filetype: string = '';
//     value: string = '';
// }
export const activeStep = {
    increment: 19.33,
    step1: 'datoscontacto',
    step2: 'datosgenerales',
    step3: 'apariencia',
    step4: 'tarifa',
    step5: 'servicios',
    step6: 'Galeria'
}
export class ModelCarga {
    codigo: number = 0;
    descripcion: string = "";
    flag: boolean = false;
}

// export class Personal {
//     cabello: number = 0;
//     lastName: string = '';
//     email: string = '';
// }