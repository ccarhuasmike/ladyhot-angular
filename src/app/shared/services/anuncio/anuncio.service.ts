import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { StepService } from "./step.service";
import { Tbl_anuncio } from '../../../Models/Tbl_anuncioModels';
import { ClientResponse, ClientResponseResult } from '../../../Models/ClientResponseModels';
import { Tbl_galeria_anuncio } from "../../../Models/Tbl_galeria_anuncioModels";
import { map, tap } from 'rxjs/operators';
import { FormData, DatosContacto, DatosGenerales, Apariencia, Tarifas, Servicios } from '../../../view/models/modelanuncio';
import { ConfigService } from "../Utilitarios/config.service";
import { catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { HttpErrorHandler, HandleError } from '../../../throwError/http-error-handler.service';
import { HttpClient, HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


const options = new RequestOptions({
    headers: new Headers({
        "Content-Type": "application/json"

    })
});

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Accept": 'application/json'
    })
};




@Injectable() // The Injectable decorator is required for dependency injection to work
export class AnuncioService {
    private formData: FormData = new FormData();
    _baseUrl: string = '';
    private handleError: HandleError;
    public progress: number = 0;
    public message: string = "";
    public percentage: number = 0
    public completed: number = 0

    constructor(
        private http: Http,
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

        // var peginatedResult: ClientResponseResult<ClientResponse> = new ClientResponseResult<ClientResponse>();
        // return this.http.post(this._baseUrl + 'anuncio/Segundopaso', JSON.stringify(anuncio), options).pipe(
        //     map(res => {
        //         peginatedResult.result = res.json();
        //         return peginatedResult;
        //     })
        // );
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
    SaveGaleria(galeria: Tbl_galeria_anuncio): Observable<HttpEvent<ClientResponse>> {
        // var clientResponse: Observable<ClientResponse> = new Observable<ClientResponse>();
        const req = new HttpRequest('POST', this._baseUrl + 'galeria/InsertGaleria', galeria, {
            reportProgress: true,
        });

        // this.httpClient.request<ClientResponse>(req).subscribe(
        //     (event) => {
        //         if (event.type === HttpEventType.UploadProgress) {
        //             this.progress = Math.round(100 * event.loaded / event.total);
        //         }
        //         else if (event.type === HttpEventType.Response) {
        //             debugger;
        //             event.body;
        //         }
        //     });
        //return clientResponse;
        return this.httpClient.request<ClientResponse>(req)
            .pipe(
                catchError(this.handleError('SaveGaleria'))
            );
    }

    private getEventMessage(event: HttpEvent<any>, formData) {

        switch (event.type) {

            case HttpEventType.UploadProgress:
                return this.fileUploadProgress(event);

            case HttpEventType.Response:
                return this.apiResponse(event);

            default:
                return `File "${formData.get('profile').name}" surprising upload event: ${event.type}.`;
        }
    }
    private apiResponse(event) {
        return event.body;
    }


    private fileUploadProgress(event) {
        const percentDone = Math.round(100 * event.loaded / event.total);
        return { status: 'progress', message: percentDone };
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
    getListarMisAnuncios(): Observable<ClientResponseResult<any[]>> {
        var paginatedResult: ClientResponseResult<any[]> = new ClientResponseResult<any[]>();
        return this.http.get(this._baseUrl + 'misanuncios/ListarMisAnuncios').pipe(
            map(res => {
                paginatedResult.result = JSON.parse(res.json().DataJson);
                return paginatedResult;
            })
        );
    }

    getAnuncioPorId(id: String): Observable<ClientResponseResult<any[]>> {
        var paginatedResult: ClientResponseResult<any[]> = new ClientResponseResult<any[]>();
        return this.http.post(this._baseUrl + 'anuncio/GetAnucionXId/' + id, options).pipe(
            map(res => {
                paginatedResult.result = res.json().Data;
                return paginatedResult;
            })
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