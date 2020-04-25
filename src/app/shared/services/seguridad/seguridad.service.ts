import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../Utilitarios/config.service';
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
    constructor(
        private httpClient: HttpClient,
        private configService: ConfigService,        
    ) {
        this._baseUrl = configService.getWebApiURL();        
    }

    EnvioEmailGenerarContrasenia(beanMail: Bean_mail): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'seguridad/EnvioEmailGenerarContrasnia', JSON.stringify(beanMail), httpOptions).pipe(
            //catchError(null)
        );
    }
    ReestablecerContrasnia(beanMail: Bean_mail): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'seguridad/ReestablecerContrasnia', JSON.stringify(beanMail), httpOptions).pipe(
            //catchError(null)
        );
    }

    ActualizarPasswordUsuario(tblUsuario: Tbl_usuario): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'seguridad/ActualizarPasswordUsuario', JSON.stringify(tblUsuario), httpOptions).pipe(
            //catchError(null)
        );
    }
}