import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http } from '@angular/http';
import { ConfigService } from '../Utilitarios/config.service';
import { Observable } from 'rxjs';
import { ClientResponseResult, ClientResponse, Pagination } from 'src/app/Models/ClientResponseModels';
import { map } from 'rxjs/operators';
import { Tbl_anuncio } from 'src/app/Models/Tbl_anuncioModels';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient, HttpParams } from '@angular/common/http';

const options = new RequestOptions({
    headers: new Headers({
        "Content-Type": "application/json"
    })
});

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
        private http: Http,
        private httpClient: HttpClient,
        private configService: ConfigService    
    ) {
        this._baseUrl = configService.getWebApiURL();        
    }

    ListaPaginado(pagination: Pagination): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'anuncio/Listarpaginado', pagination, httpOptions).pipe();
    }
    ListarAnuncioPaginate(anuncio: Tbl_anuncio): Observable<ClientResponseResult<ClientResponse>> {
        var peginatedResult: ClientResponseResult<ClientResponse> = new ClientResponseResult<ClientResponse>();
        return this.http.post(this._baseUrl + 'anuncio/ListarAnuncioPaginate', JSON.stringify(anuncio), options).pipe(
            map(res => {
                peginatedResult.result = res.json();
                return peginatedResult;
            })
        );
    }
}