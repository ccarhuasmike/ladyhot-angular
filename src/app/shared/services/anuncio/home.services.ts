import { Injectable } from '@angular/core';
import { ConfigService } from "../Utilitarios/config.service";
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientResponse } from '../../../Models/ClientResponseModels';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Accept": 'application/json'
    })
};
//https://stackblitz.com/angular/ooqemvjyqkb?file=src%2Fapp%2Fauth.service.ts
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
            //catchError(null)
        );
    }

    getSerialized<T>(arg: any): T {
        return <T>JSON.parse(JSON.stringify(arg));
    }
    getFormUrlEncoded(toConvert) {
        const formBody = [];
        for (const property in toConvert) {
            const encodedKey = encodeURIComponent(property);
            const encodedValue = encodeURIComponent(toConvert[property]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        return formBody.join('&');
    }
    serializeObj(obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
        return result.join("&");
    }
}