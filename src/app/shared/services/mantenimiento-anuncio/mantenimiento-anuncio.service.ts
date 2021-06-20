import { Injectable } from '@angular/core';
import { ConfigService } from '../Utilitarios/config.service';
import { Observable } from 'rxjs';
import { ClientResponse, Pagination } from 'src/app/Models/ClientResponseModels';
import { Tbl_anuncio } from 'src/app/Models/Tbl_anuncioModels';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Accept": 'application/json'
    })
};

@Injectable()
export class MantenimientoAnuncioService {
    _baseUrl: string = '';

    constructor(
        private httpClient: HttpClient,
        private configService: ConfigService    
    ) {
        this._baseUrl = configService.getWebApiURL();        
    }

    ListaPaginado(pagination: Pagination): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'anuncio/Listarpaginado', pagination, httpOptions).pipe();
    }
    ListarAnuncioPaginate(anuncio: Tbl_anuncio): Observable<ClientResponse> {
        //var peginatedResult: ClientResponseResult<ClientResponse> = new ClientResponseResult<ClientResponse>();
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'anuncio/ListarAnuncioPaginate', JSON.stringify(anuncio), httpOptions).pipe(/*
            map(res => {
                peginatedResult.result = res.json();
                return peginatedResult;
            })
        */);
    }
}