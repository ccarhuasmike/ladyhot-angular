import { Injectable } from '@angular/core';
import { ConfigService } from '../Utilitarios/config.service';
import { Bean_mail } from 'src/app/Models/Bean_mail';
import { Observable } from 'rxjs';
import { ClientResponseResult, ClientResponse } from 'src/app/Models/ClientResponseModels';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Accept": 'application/json'
    })
};

@Injectable()
export class ContactarService {
    _baseUrl: string = '';

    constructor(
        private http: HttpClient, private configService: ConfigService       
    ) {
        this._baseUrl = configService.getWebApiURL();       
    }

    EnviarMail(beanMail: Bean_mail): Observable<ClientResponse> {
        //var peginatedResult: ClientResponseResult<ClientResponse> = new ClientResponseResult<ClientResponse>();
        return this.http.post<ClientResponse>(this._baseUrl + 'contactar/EnvioEmail', JSON.stringify(beanMail), httpOptions).pipe(/*
            map(res => {
                peginatedResult.result = res.json();
                return peginatedResult;
            })*/);
    }
}