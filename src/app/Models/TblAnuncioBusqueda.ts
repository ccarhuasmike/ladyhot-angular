import { Pagination } from "./ClientResponseModels";

export class TblAnuncioBusqueda {
    edad_min: number;
    edad_max: number;
    estatura: number;
    ojos: number;
    pais: number;
    pelo: number;
    peso: number;
    forma_pago: string;
    lugar_atencion: string;
    servicio_ofrece: string;
    nombre_ficha: string;
    paginacion: Pagination;
}