import { Injectable } from '@angular/core';
import { ConfigService } from "../Utilitarios/config.service";
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientResponse } from '../../../Models/ClientResponseModels';
import { HttpClient } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Accept": 'application/json'
    })
};
@Injectable()
export class HomeService {
    filter: any = {};
    _baseUrl: string = '';
    list: any = [];
    constructor(
        private configService: ConfigService,
        private httpClient: HttpClient
    ) {
        this._baseUrl = configService.getWebApiURL();
    }
    getAnuncio(): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'anuncio/ListarAnuncio', {}, httpOptions).pipe(
        );
    }    
}