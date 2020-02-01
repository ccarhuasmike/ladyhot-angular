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

  getListarProductosSubirAutomatico(): Observable<ClientResponse> {
    return this.httpClient.post<ClientResponse>(this._baseUrl + 'misanuncios/ListarMisAnuncioPorUsuario', httpOptions).pipe(
      catchError(this.handleError('getListarProductosSubirAutomatico'))
    );
  }
}
