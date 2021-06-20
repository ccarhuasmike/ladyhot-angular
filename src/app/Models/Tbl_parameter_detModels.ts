export interface Tbl_parameter_det {
    id: number;
    skey_det: string;
    val_valor: number;
    tx_valor: string;
    tx_descripcion: number;
    id_estado_reg: number;
    dt_fe_crea: Date;
}


export class PaginatedResult<T> {
    result: T;
}
