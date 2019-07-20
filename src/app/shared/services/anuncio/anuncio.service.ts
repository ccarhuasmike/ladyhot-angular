import { Injectable } from '@angular/core';
import { StepService } from "./step.service";
import { Tbl_anuncio } from '../../../Models/Tbl_anuncioModels';
import { ClientResponse } from '../../../Models/ClientResponseModels';
import { Tbl_galeria_anuncio } from "../../../Models/Tbl_galeria_anuncioModels";
import { FormData } from '../../../view/models/modelanuncio';
import { ConfigService } from "../Utilitarios/config.service";
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpErrorHandler, HandleError } from '../../../throwError/http-error-handler.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Accept": 'application/json'
    })
};

@Injectable() // The Injectable decorator is required for dependency injection to work
export class AnuncioService {
    _baseUrl: string = '';
    private handleError: HandleError;
    public progress: number = 0;
    public message: string = "";
    public percentage: number = 0
    public completed: number = 0

    constructor(
        private httpClient: HttpClient,
        private stepService: StepService,
        private configService: ConfigService,
        httpErrorHandler: HttpErrorHandler
    ) {
        this._baseUrl = configService.getWebApiURL();
        this.handleError = httpErrorHandler.createHandleError('HeroesService');
    }

    SavePrimerPaso(anuncio: Tbl_anuncio): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'anuncio/Primeropaso', anuncio, httpOptions).pipe(
            catchError(this.handleError('SavePrimerPaso'))
        );
    }
    ///https://stackblitz.com/angular/ooqemvjyqkb?file=src%2Fapp%2Fheroes%2Fheroes.service.ts
    SavePrimerPaso1(anuncio: Tbl_anuncio): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'anuncio/Primeropaso', JSON.stringify(anuncio), httpOptions).pipe(
            catchError(this.handleError('SavePrimerPaso1'))
        );
    }

    UpdateSavePrimerPaso(anuncio: Tbl_anuncio): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'anuncio/ActualizarPrimerpaso', JSON.stringify(anuncio), httpOptions).pipe(
            catchError(this.handleError('UpdateSavePrimerPaso'))
        );
    }
    SaveSegundoPaso(anuncio: Tbl_anuncio): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'anuncio/Segundopaso', JSON.stringify(anuncio), httpOptions).pipe(
            catchError(this.handleError('SaveSegundoPaso'))
        );
    }

    SaveTerceroPaso(anuncio: Tbl_anuncio): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'anuncio/Tercerpaso', JSON.stringify(anuncio), httpOptions).pipe(
            catchError(this.handleError('SaveTerceroPaso'))
        );
    }
    SaveCuartoPaso(anuncio: Tbl_anuncio): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'anuncio/Cuartopaso', JSON.stringify(anuncio), httpOptions).pipe(
            catchError(this.handleError('SaveCuartoPaso'))
        );
    }
    SaveQuintoPaso(anuncio: Tbl_anuncio): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'anuncio/Quintopaso', JSON.stringify(anuncio), httpOptions).pipe(
            catchError(this.handleError('SaveCuartoPaso'))
        );
    }

    /*Galeria*/
    SaveGaleria(galeria: Tbl_galeria_anuncio): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'galeria/InsertGaleria', galeria, httpOptions)
            .pipe(
                catchError(this.handleError('GetGaleriaXIdAnuncio'))
            );
    }
    GetGaleriaXIdAnuncio(galeria: Tbl_galeria_anuncio): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'galeria/GetGeleriaXIdAnuncio', galeria, httpOptions)
            .pipe(
                catchError(this.handleError('GetGaleriaXIdAnuncio'))
            );
    }
    EliminarGaleriaXId(galeria: Tbl_galeria_anuncio): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'galeria/EliminarFoto', galeria, httpOptions)
            .pipe(
                catchError(this.handleError('EliminarGaleriaXId'))
            );
    }

    Saveactualizartodo(anuncio: Tbl_anuncio): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'anuncio/ActualizarTodo', anuncio, httpOptions)
            .pipe(
                catchError(this.handleError('Saveactualizartodo'))
            );
    }
    getListarMisAnuncios(): Observable<ClientResponse> {
        return this.httpClient.get<ClientResponse>(this._baseUrl + 'misanuncios/ListarMisAnuncioPorUsuario').pipe(
            catchError(this.handleError('getListarMisAnuncioPorUsuario'))
        );
    }

    getAnuncioPorId(id: String): Observable<ClientResponse> {
        return this.httpClient.get<ClientResponse>(this._baseUrl + 'anuncio/GetAnucionXId/' + id).pipe(
            catchError(this.handleError('getAnuncioPorId'))
        );
    }
    darBajaMiAnuncio(anuncio: Tbl_anuncio): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'anuncio/DarBajarAnuncio/', anuncio, httpOptions)
            .pipe(
                catchError(this.handleError('darBajaMiAnuncio'))
            );
    }

    segundopaso(flag: boolean) {
        this.stepService.activaStep2(flag);
    }
    tercerpaso(flag: boolean) {
        this.stepService.activaStep3(flag);
    }
    cuartopaso(flag: boolean) {
        this.stepService.activaStep4(flag);
    }
    quintopaso(flag: boolean) {
        this.stepService.activaStep5(flag);
    }
    sextopaso(flag: boolean) {
        this.stepService.activaStep6(flag);
    }
}