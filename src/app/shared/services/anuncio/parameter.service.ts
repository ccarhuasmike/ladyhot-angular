import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientResponse } from '../../../Models/ClientResponseModels';
import { ConfigService } from "../Utilitarios/config.service";
import { HttpClient } from '@angular/common/http';
@Injectable()
export class ParameterService {
    filter: any = {};
    _baseUrl: string = '';
    list: any = [];
    constructor(
        private httpClient: HttpClient,
        private configService: ConfigService,

    ) {
        this._baseUrl = configService.getWebApiURL();
    }
    getParameter(): Observable<ClientResponse> {
        return this.httpClient.get<ClientResponse>(this._baseUrl + 'parameter/sel_parameter').pipe();
    }
    getParameterFilterHome(): Observable<ClientResponse> {
        return this.httpClient.get<ClientResponse>(this._baseUrl + 'parameter/sel_parameter_filter_home').pipe();
    }
}