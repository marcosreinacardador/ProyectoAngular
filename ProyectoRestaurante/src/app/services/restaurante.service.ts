import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurante } from '../models/restaurante';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {
static readonly URL_GET_RESTAURANTES:string = "http://localhost:8081/restaurante/";

cabeceras: HttpHeaders = new HttpHeaders({'Content-type': 'application/json'});
  http: any;

  constructor(private hhtp:HttpClient) { }

  getListaRestaurante() : Observable<Array<Restaurante>>{ 

    return this.hhtp.get<Array<Restaurante>>(RestauranteService.URL_GET_RESTAURANTES);

  }

  postRestaurante (restaurante:Restaurante):Observable<Restaurante>
  {
   return this.hhtp.post<Restaurante>(RestauranteService.URL_GET_RESTAURANTES, restaurante, {headers:this.cabeceras});
  }
}
