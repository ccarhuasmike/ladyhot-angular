export interface ClientResponse {
    Id: number;
    Data: object;
    DataJson: string;
    Errores: object;
    Mensaje: string;
    Status: string;
    StatusCode: number;
    ViewResult: string;
    paginacion: string;
}

export class ClientResponseResult<T> {
    result: T;
}

export interface Pagination {
    CurrentPage: number;
    ItemsPerPage: number;
    TotalItems: number;
    TotalPages: number;
}