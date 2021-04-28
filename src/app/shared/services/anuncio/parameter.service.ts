import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ClientResponse } from '../../../Models/ClientResponseModels';
import { ConfigService } from "../Utilitarios/config.service";
import { HttpClient } from '@angular/common/http';
//https://stackblitz.com/angular/ooqemvjyqkb?file=src%2Fapp%2Fauth.service.ts
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
        return this.httpClient.get<ClientResponse>(this._baseUrl + 'parameter/sel_parameter').pipe(
            //catchError(null)
        );
    }
    getParameterFilterHome(): Observable<ClientResponse> {
        
        return this.httpClient.get<ClientResponse>(this._baseUrl + 'parameter/sel_parameter_filter_home').pipe(
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