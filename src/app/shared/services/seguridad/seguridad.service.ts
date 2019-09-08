import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../Utilitarios/config.service';
import { HandleError, HttpErrorHandler } from 'src/app/throwError/http-error-handler.service';
import { Bean_mail } from 'src/app/Models/Bean_mail';
import { Observable } from 'rxjs';
import { ClientResponse } from 'src/app/Models/ClientResponseModels';
import { catchError } from 'rxjs/operators';
import { Tbl_usuario } from 'src/app/Models/Tbl_usuario';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Accept": 'application/json'
    })
};


@Injectable()
export class SeguridadService {

    _baseUrl: string = '';
    private handleError: HandleError;
    constructor(
        private httpClient: HttpClient,
        private configService: ConfigService,
        httpErrorHandler: HttpErrorHandler
    ) {
        this._baseUrl = configService.getWebApiURL();
        this.handleError = httpErrorHandler.createHandleError('SeguridadService');
    }

    EnvioEmailGenerarContrasenia(beanMail: Bean_mail): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'seguridad/EnvioEmailGenerarContrasnia', JSON.stringify(beanMail), httpOptions).pipe(
            catchError(this.handleError('EnvioEmailGenerarContrasnia'))
        );
    }
    ActualizarPasswordUsuario(tblUsuario: Tbl_usuario): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'seguridad/ActualizarPasswordUsuario', JSON.stringify(tblUsuario), httpOptions).pipe(
            catchError(this.handleError('ActualizarPasswordUsuario'))
        );
    }
}