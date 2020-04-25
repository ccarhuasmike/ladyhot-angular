import { Injectable } from '@angular/core';
import { StepService } from "./step.service";
import { Tbl_anuncio } from '../../../Models/Tbl_anuncioModels';
import { ClientResponse } from '../../../Models/ClientResponseModels';
import { Tbl_galeria_anuncio } from "../../../Models/Tbl_galeria_anuncioModels";
import { ConfigService } from "../Utilitarios/config.service";
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
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
    public progress: number = 0;
    public message: string = "";
    public percentage: number = 0
    public completed: number = 0

    constructor(
        private httpClient: HttpClient,
        private stepService: StepService,
        private configService: ConfigService,        
    ) {
        this._baseUrl = configService.getWebApiURL();     
    }

    SavePrimerPaso(anuncio: Tbl_anuncio): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'anuncio/Primeropaso', anuncio, httpOptions).pipe(
            //catchError(null)
        );
    }
    ///https://stackblitz.com/angular/ooqemvjyqkb?file=src%2Fapp%2Fheroes%2Fheroes.service.ts
    SavePrimerPaso1(anuncio: Tbl_anuncio): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'anuncio/Primeropaso', JSON.stringify(anuncio), httpOptions).pipe(
            //catchError(null)
        );
    }

    UpdateSavePrimerPaso(anuncio: Tbl_anuncio): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'anuncio/ActualizarPrimerpaso', JSON.stringify(anuncio), httpOptions).pipe(
            //catchError(null)
        );
    }
    SaveSegundoPaso(anuncio: Tbl_anuncio): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'anuncio/Segundopaso', JSON.stringify(anuncio), httpOptions).pipe(
            //catchError(null)
        );
    }

    SaveTerceroPaso(anuncio: Tbl_anuncio): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'anuncio/Tercerpaso', JSON.stringify(anuncio), httpOptions).pipe(
            //catchError(null)
        );
    }
    SaveCuartoPaso(anuncio: Tbl_anuncio): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'anuncio/Cuartopaso', JSON.stringify(anuncio), httpOptions).pipe(
            //catchError(null)
        );
    }
    SaveQuintoPaso(anuncio: Tbl_anuncio): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'anuncio/Quintopaso', JSON.stringify(anuncio), httpOptions).pipe(
            //catchError(null)
        );
    }

    /*Galeria*/
    SaveGaleria(galeria: Tbl_galeria_anuncio): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'galeria/InsertGaleria', galeria, httpOptions)
            .pipe(
                //catchError(null)
            );
    }
    GetGaleriaXIdAnuncio(galeria: Tbl_galeria_anuncio): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'galeria/GetGeleriaXIdAnuncio', galeria, httpOptions)
            .pipe(
                //catchError(null)
            );
    }
    EliminarGaleriaXId(galeria: Tbl_galeria_anuncio): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'galeria/EliminarFoto', galeria, httpOptions)
            .pipe(
                //catchError(null)
            );
    }

    Saveactualizartodo(anuncio: Tbl_anuncio): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'anuncio/ActualizarTodo', anuncio, httpOptions)
            .pipe(
                //catchError(null)
            );
    }
    getListarMisAnuncios(anuncio: Tbl_anuncio): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'misanuncios/ListarMisAnuncioPorUsuario', anuncio, httpOptions).pipe(
            //catchError(null)
        );
    }

    getAnuncioPorId(id: String): Observable<ClientResponse> {
        return this.httpClient.get<ClientResponse>(this._baseUrl + 'anuncio/GetAnucionXId/' + id).pipe(
            //catchError(null)
        );
    }
    ObtenerDetalleAnucionXId(id: String): Observable<ClientResponse> {
        return this.httpClient.get<ClientResponse>(this._baseUrl + 'anuncio/ObtenerDetalleAnucionXId/' + id).pipe(
            //catchError(null)
        );
    }

    darBajaMiAnuncio(anuncio: Tbl_anuncio): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'anuncio/DarBajarAnuncio/', anuncio, httpOptions)
            .pipe(
                //catchError(null)
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