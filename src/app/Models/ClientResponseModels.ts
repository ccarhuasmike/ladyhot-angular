export interface ClientResponse {
    Id: number;
    Data: object;
    DataJson: string;
    Errores: object;
    Mensaje: string;
    Status: string;
    StatusCode: number;
    ViewResult: string;
}

export class ClientResponseResult<T> {
    result: T;
}