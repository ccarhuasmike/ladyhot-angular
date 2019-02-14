import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http } from '@angular/http';
import { HandleError, HttpErrorHandler } from 'src/app/throwError/http-error-handler.service';
import { ConfigService } from '../Utilitarios/config.service';
import { Observable } from 'rxjs';
import { ClientResponseResult, ClientResponse } from 'src/app/Models/ClientResponseModels';
import { map } from 'rxjs/operators';
import { Tbl_anuncio } from 'src/app/Models/Tbl_anuncioModels';

const options = new RequestOptions({
    headers: new Headers({
        "Content-Type": "application/json"
    })
});
@Injectable()
export class MantenimientoAnuncioService {
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

    ListarAnuncioPaginate(anuncio: Tbl_anuncio): Observable<ClientResponseResult<ClientResponse>> {
        var peginatedResult: ClientResponseResult<ClientResponse> = new ClientResponseResult<ClientResponse>();
        return this.http.post(this._baseUrl + 'anuncio/ListarAnuncioPaginate', JSON.stringify(anuncio), options).pipe(
            map(res => {
                peginatedResult.result = res.json();
                return peginatedResult;
            })
        );
    }

}