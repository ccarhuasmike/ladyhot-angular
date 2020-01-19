import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandler } from 'src/app/throwError/http-error-handler.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../Utilitarios/config.service';
import { Observable } from 'rxjs';
import { BeanChargeViewModel } from '../../../Models/BeanChargeViewModel';
import { BeanCharge } from 'src/app/Models/BeanCharge';
import { catchError } from 'rxjs/operators';
import { ClientResponse } from 'src/app/Models/ClientResponseModels';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Accept": 'application/json'
    })
};

@Injectable()
export class PasarelaPagoService {
    _baseUrl: string = '';
    private handleError: HandleError;

    constructor(
        private httpClient: HttpClient,
        private configService: ConfigService,
        httpErrorHandler: HttpErrorHandler
    ) {
        this._baseUrl = configService.getWebApiURL();
        this.handleError = httpErrorHandler.createHandleError('PasarelaPagoService');
    }

    CrearCargo(beanCharge: BeanCharge): Observable<BeanChargeViewModel> {
        return this.httpClient.post<BeanChargeViewModel>(this._baseUrl + 'anuncio/CrearCargo', JSON.stringify(beanCharge), httpOptions).pipe(
            catchError(this.handleError('CrearCargo'))
        );
    }
    
    obtenerLlavePublica(): Observable<ClientResponse> {
        return this.httpClient.get<ClientResponse>(this._baseUrl + 'anuncio/ObtenerLlavePublica', httpOptions).pipe(
            catchError(this.handleError('ObtenerLlavePublica'))
        );
    }
}