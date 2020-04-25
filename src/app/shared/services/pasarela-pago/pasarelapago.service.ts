import { Injectable } from '@angular/core';
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
    

    constructor(
        private httpClient: HttpClient,
        private configService: ConfigService,
        
    ) {
        this._baseUrl = configService.getWebApiURL();        
    }

    CrearCargo(beanCharge: BeanCharge): Observable<BeanChargeViewModel> {
        return this.httpClient.post<BeanChargeViewModel>(this._baseUrl + 'anuncio/CrearCargo', JSON.stringify(beanCharge), httpOptions).pipe(
            //catchError(null)
        );
    }
    
    obtenerLlavePublica(): Observable<ClientResponse> {
        return this.httpClient.get<ClientResponse>(this._baseUrl + 'anuncio/ObtenerLlavePublica', httpOptions).pipe(
            //catchError(null)
        );
    }
}