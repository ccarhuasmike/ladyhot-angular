import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../Utilitarios/config.service';
import { Observable } from 'rxjs';
import { ClientResponseResult, ClientResponse } from '../../..//Models/ClientResponseModels';
import { map, catchError } from 'rxjs/operators';
import { Tbl_usuario } from 'src/app/Models/Tbl_usuario';


const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Accept": 'application/json'
    })
};
@Injectable()
export class UsuarioService {
    _baseUrl: string = '';
    constructor(
        private httpClient: HttpClient,
        private configService: ConfigService        
    ) {
        this._baseUrl = configService.getWebApiURL();        
    }

    IniciarSession(tblUsuario: Tbl_usuario): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'usuario/loguear', JSON.stringify(tblUsuario), httpOptions)
            .pipe(
                //catchError(null)
            );
    }
    getUsuarioPorToken(tblUsuario: Tbl_usuario): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'usuario/getUsuarioPorToken', JSON.stringify(tblUsuario), httpOptions)
            .pipe(
                //catchError(null)
            );
    }
}