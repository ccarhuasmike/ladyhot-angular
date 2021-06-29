export interface ClientResponse {
    Id: number;
    Data: object;
    DataJson: string;
    Errores: object;
    Mensaje: string;
    Status: string;
    StatusCode: number;
    ViewResult: string;
    totalCount: string;
    paginacion: string;
}

export class ClientResponseResult<T> {
    result: T;
}

export class Pagination {
    CurrentPage: number;
    ItemsPerPage: number;
    TotalItems: number;
    TotalPages: number;
    StartPages: number;
}