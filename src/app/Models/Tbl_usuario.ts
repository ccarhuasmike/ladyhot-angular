export interface Tbl_usuario {
    id: number;
    tx_pass: string;
    tx_email: string;
    dt_fe_crea: Date;
    id_estado_reg: number;
    tx_token: string;
    tx_nombre: string;
    tx_apellido: string;
    tx_celular: string;
    tx_telefono: string;
    id_tipo_cliente: number;
}