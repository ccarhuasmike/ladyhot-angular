import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from "../Utilitarios/config.service";
import { HttpClient } from '@angular/common/http';
@Injectable()
export class UbigeoService {
    filter: any = {};
    _baseUrl: string = '';
    list: any = [];
    constructor(
        private httpClient: HttpClient,
        private configService: ConfigService,

    ) {
        this._baseUrl = configService.getWebApiURL();
    }
    getDepartamento(): Observable<any> {
        return this.httpClient.get<any>(this._baseUrl + 'ubigeo/sel_departamento').pipe();
    }
    getProvincia(IdDepa: number): Observable<any> {
        return this.httpClient.post<any>(this._baseUrl + 'ubigeo/sel_provincia',{IdDepa :IdDepa }).pipe();
    }
    getDistrito(IdProv: number): Observable<any> {
        return this.httpClient.post<any>(this._baseUrl + 'ubigeo/sel_distrito',{IdProv :IdProv }).pipe();
    }
}