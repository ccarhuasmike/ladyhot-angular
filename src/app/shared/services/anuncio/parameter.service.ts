import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { PaginatedResult, Tbl_parameter_det } from '../../../Models/Tbl_parameter_detModels';
import { ConfigService } from "../Utilitarios/config.service";
import { HttpErrorHandler, HandleError } from '../../../throwError/http-error-handler.service';
//https://stackblitz.com/angular/ooqemvjyqkb?file=src%2Fapp%2Fauth.service.ts
@Injectable()
export class ParameterService {
    filter: any = {};
    _baseUrl: string = '';
    list: any = [];
    private handleError: HandleError;
    constructor(
        private http: Http,
        private configService: ConfigService,
        httpErrorHandler: HttpErrorHandler
    ) {
        this.handleError = httpErrorHandler.createHandleError('HeroesService');
        this._baseUrl = configService.getWebApiURL();
    }
    getParameter(): Observable<PaginatedResult<any[]>> {
        var peginatedResult: PaginatedResult<any[]> = new PaginatedResult<any[]>();
        return this.http.get(this._baseUrl + 'parameter/sel_parameter').pipe(
            map(res => {
                peginatedResult.result = JSON.parse(res.json().DataJson);
                return peginatedResult;
            }), catchError(this.handleError('getParameter'))
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