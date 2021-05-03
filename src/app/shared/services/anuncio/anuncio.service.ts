import { Injectable } from '@angular/core';
import { StepService } from "./step.service";
import { Tbl_anuncio } from '../../../models/Tbl_anuncioModels';
import { ClientResponse } from '../../../models/ClientResponseModels';
import { Tbl_galeria_anuncio } from "../../../models/Tbl_galeria_anuncioModels";
import { ConfigService } from "../Utilitarios/config.service";
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
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'anuncio/Primeropaso', anuncio, httpOptions).pipe();
    }
    ///https://stackblitz.com/angular/ooqemvjyqkb?file=src%2Fapp%2Fheroes%2Fheroes.service.ts
    SavePrimerPaso1(anuncio: Tbl_anuncio): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'anuncio/Primeropaso', JSON.stringify(anuncio), httpOptions).pipe();
    }

    UpdateSavePrimerPaso(anuncio: Tbl_anuncio): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'anuncio/ActualizarPrimerpaso', JSON.stringify(anuncio), httpOptions).pipe();
    }
    SaveSegundoPaso(anuncio: Tbl_anuncio): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'anuncio/Segundopaso', JSON.stringify(anuncio), httpOptions).pipe();
    }

    SaveTerceroPaso(anuncio: Tbl_anuncio): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'anuncio/Tercerpaso', JSON.stringify(anuncio), httpOptions).pipe();
    }
    SaveCuartoPaso(anuncio: Tbl_anuncio): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'anuncio/Cuartopaso', JSON.stringify(anuncio), httpOptions).pipe();
    }
    SaveQuintoPaso(anuncio: Tbl_anuncio): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'anuncio/Quintopaso', JSON.stringify(anuncio), httpOptions).pipe();
    }

    /*Galeria*/
    SaveGaleria(galeria: Tbl_galeria_anuncio): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'galeria/InsertGaleria', galeria, httpOptions)
            .pipe();
    }
    GetGaleriaXIdAnuncio(galeria: Tbl_galeria_anuncio): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'galeria/GetGeleriaXIdAnuncio', galeria, httpOptions)
            .pipe();
    }
    EliminarGaleriaXId(galeria: Tbl_galeria_anuncio): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'galeria/EliminarFoto', galeria, httpOptions)
            .pipe();
    }

    Saveactualizartodo(anuncio: Tbl_anuncio): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'anuncio/ActualizarTodo', anuncio, httpOptions)
            .pipe();
    }
    getListarMisAnuncios(anuncio: Tbl_anuncio): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'misanuncios/ListarMisAnuncioPorUsuario', anuncio, httpOptions).pipe();
    }

    getAnuncioPorId(id: String): Observable<ClientResponse> {
        return this.httpClient.get<ClientResponse>(this._baseUrl + 'anuncio/GetAnucionXId/' + id).pipe();
    }
    ObtenerDetalleAnucionXId(id: String): Observable<ClientResponse> {
        return this.httpClient.get<ClientResponse>(this._baseUrl + 'anuncio/ObtenerDetalleAnucionXId/' + id).pipe();
    }

    darBajaMiAnuncio(anuncio: Tbl_anuncio): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this._baseUrl + 'anuncio/DarBajarAnuncio/', anuncio, httpOptions)
            .pipe();
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