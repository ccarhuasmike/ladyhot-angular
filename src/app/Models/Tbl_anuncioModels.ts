import { Bean_paginate } from "./Bean_paginate";

export interface Tbl_anuncio {
    id: number;
    txt_nombre_ficha: string;
    txt_telefono_1: number;
    txt_telefono_2: string;
    txt_email: number;
    txt_web: string;
    int_edad: number;
    int_pais_origen: number;
    tx_pais_origen: string;
    int_estudios: number;
    tx_estudio: string;
    txt_presentacion: string;
    int_color_cabello: number;
    tx_color_cabello: string;
    int_color_ojos: number;
    tx_color_ojos: string;
    int_estatura: number;
    int_peso: number;
    txt_medidas_busto_cintura_cadera: string;
    txt_descripcion_extra_apariencia: string;
    dbl_costo_x_tiempo_30min: number;
    dbl_costo_x_tiempo_45min: number;
    dbl_costo_x_tiempo_1hora: number;
    dbl_costo_x_tiempo_1hora_media: number;
    dbl_costo_x_tiempo_2hora: number;
    dbl_costo_x_tiempo_3hora: number;
    dbl_costo_x_tiempo_salidas: number;
    dbl_costo_x_tiempo_toda_noche: number;
    dbl_costo_x_viaje: number;
    txt_forma_pago: string;
    txt_descripcion_extra_tarifa: string;
    txt_lugar_servicio_distrito: string;
    fl_atencion_24horas: number;
    tx_fl_atencion_24horas: string;
    tx_descripcion_extra_horario: string;
    tx_lugar_atencion: string;
    tx_servicios_ofrece: string;
    tx_descripcion_extra_servicio: string;
    tx_foto_presentacion: string;
    dt_fe_ini_vig: Date;
    dt_fe_fin_vig: Date;
    dt_fe_crea: Date;
    id_estado_reg: number;
    fl_portada: number;
    filenametop: string;
    id_categoria: number;
    id_tipo_anuncio: number;
    id_tarifa_anuncio: number;
    id_pago_anuncio: number;
    dbl_pago_total_tarifa_calculado: number;
    dbl_pago_total_depositado: number;
    fl_cerrado: number;
    cod_anuncio_encryptado: string;
    id_usuario: number;
    txt_imagen_prensetancion: string;

    //parametros adicionales
    beanPaginate: Bean_paginate;
}

