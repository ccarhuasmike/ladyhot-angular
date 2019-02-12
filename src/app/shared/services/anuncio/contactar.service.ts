import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http } from '@angular/http';
import { ConfigService } from '../Utilitarios/config.service';
import { HandleError, HttpErrorHandler } from 'src/app/throwError/http-error-handler.service';
import { Bean_mail } from 'src/app/Models/Bean_mail';
import { Observable } from 'rxjs';
import { ClientResponseResult, ClientResponse } from 'src/app/Models/ClientResponseModels';
import { map, catchError } from 'rxjs/operators';

const options = new RequestOptions({
    headers: new Headers({
        "Content-Type": "application/json"
    })
});

@Injectable()
export class ContactarService {

    _baseUrl: string = '';
    private handleError: HandleError;

    constructor(
        private http: Http,
        private configService: ConfigService,
        httpErrorHandler: HttpErrorHandler
    ) {
        this._baseUrl = configService.getWebApiURL();
        this.handleError = httpErrorHandler.createHandleError('HeroesService');
    }

    EnviarMail(beanMail: Bean_mail): Observable<ClientResponseResult<ClientResponse>> {
        var peginatedResult: ClientResponseResult<ClientResponse> = new ClientResponseResult<ClientResponse>();
        return this.http.post(this._baseUrl + 'contactar/EnvioEmail', JSON.stringify(beanMail), options).pipe(
            map(res => {
                peginatedResult.result = res.json();
                return peginatedResult;
            }), catchError(this.handleError('EnviarMail'))
        );
    }
}