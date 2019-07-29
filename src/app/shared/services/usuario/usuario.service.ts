import { Injectable } from '@angular/core';
// import { RequestOptions, Headers, Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../Utilitarios/config.service';
import { HandleError, HttpErrorHandler } from 'src/app/throwError/http-error-handler.service';
import { Observable } from 'rxjs';
import { ClientResponseResult, ClientResponse } from 'src/app/Models/ClientResponseModels';
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
    private handleError: HandleError;

    constructor(
        private httpClient: HttpClient,
        private configService: ConfigService,
        httpErrorHandler: HttpErrorHandler
    ) {
        this._baseUrl = configService.getWebApiURL();
        this.handleError = httpErrorHandler.createHandleError('HeroesService');
    }

    IniciarSession(tblUsuario: Tbl_usuario): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'usuario/loguear', JSON.stringify(tblUsuario), httpOptions)
            .pipe(
                catchError(this.handleError('IniciarSession'))
            );
    }
}