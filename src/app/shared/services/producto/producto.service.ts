import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HandleError, HttpErrorHandler } from 'src/app/throwError/http-error-handler.service';
import { ConfigService } from '../Utilitarios/config.service';
import { Observable } from 'rxjs';
import { ClientResponse } from 'src/app/Models/ClientResponseModels';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    "Accept": 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  _baseUrl: string = '';
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService,
    httpErrorHandler: HttpErrorHandler
  ) {
    this._baseUrl = configService.getWebApiURL();
    this.handleError = httpErrorHandler.createHandleError('ProductoService');
  }

  getListarProductosSubirAutomatico(tipoSubirAutomatico: number): Observable<ClientResponse> {
    return this.httpClient.get<ClientResponse>(this._baseUrl + 'producto/ListarProductos/' + tipoSubirAutomatico).pipe(
      catchError(this.handleError('getListarProductosSubirAutomatico'))
    );
  }

  cargarHorariosSubida(): Observable<ClientResponse> {
    return this.httpClient.get<ClientResponse>(this._baseUrl + 'producto/ObtenerHorariosSubida/').pipe(
      catchError(this.handleError('ObtenerHorariosSubida'))
    );
  }
}
