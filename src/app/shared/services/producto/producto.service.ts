import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ConfigService } from '../Utilitarios/config.service';
import { Observable } from 'rxjs';
import { ClientResponse } from 'src/app/Models/ClientResponseModels';
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
  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService    
  ) {
    this._baseUrl = configService.getWebApiURL();    
  }

  getListarProductosSubirAutomatico(tipoSubirAutomatico: number): Observable<ClientResponse> {
    return this.httpClient.get<ClientResponse>(this._baseUrl + 'producto/ListarProductos/' + tipoSubirAutomatico).pipe();
  }

  cargarHorariosSubida(): Observable<ClientResponse> {
    return this.httpClient.get<ClientResponse>(this._baseUrl + 'producto/ObtenerHorariosSubida/').pipe();
  }
}