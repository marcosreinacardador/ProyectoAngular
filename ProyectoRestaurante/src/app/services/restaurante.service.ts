import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurante } from '../models/restaurante';

@Injectable({
  providedIn: 'root',
})
export class RestauranteService {

  // para usarlo en modo para verlo con el puerto 8081
  static readonly URL_RESTAURANTES_PROD: string = 'restaurante';

  // para usarlo en modo local usar eta constante
  static readonly URL_RESTAURANTES_TEST: string =
    'http://localhost:8081/restaurante';

  // sólo cambiar la URL del restauranteService
static readonly URL_ACTUAL: string = RestauranteService.URL_RESTAURANTES_TEST;

 // static readonly URL_ACTUAL: string = RestauranteService.URL_RESTAURANTES_PROD;

  cabeceras: HttpHeaders = new HttpHeaders({
    'Content-type': 'application/json',
  });

  constructor(private hhtp: HttpClient) {}

  getListaRestaurante(): Observable<Array<Restaurante>> {
    return this.hhtp.get<Array<Restaurante>>(RestauranteService.URL_ACTUAL);
  }

  postRestaurante(restaurante: Restaurante): Observable<Restaurante> {
    return this.hhtp.post<Restaurante>(
      RestauranteService.URL_ACTUAL,
      restaurante,
      { headers: this.cabeceras }
    );
  }

  borraRestaurante(id: number) {
    return this.hhtp.delete<Restaurante>(
      RestauranteService.URL_ACTUAL + `/${id}`
    );
  }

  getRestauranteById(id: number): Observable<Restaurante> {
    return this.hhtp.get<Restaurante>(RestauranteService.URL_ACTUAL + `/${id}`);
  }

  //  genera la creacion del registro del restaurante con foto
  postRestauranteConFoto(
    restaurante: Restaurante,
    archivo: File
  ): Observable<Restaurante> {
    //declaramos una variable local que represente el FormData
    let formData = new FormData();

    formData.append('nombre', restaurante.nombre);
    formData.append('direccion', restaurante.direccion);
    formData.append('barrio', restaurante.barrio);
    formData.append('web', restaurante.web);
    formData.append('fichaGoogle', restaurante.fichaGoogle);
    formData.append('latitud', restaurante.latitud + '');
    formData.append('longitud', restaurante.longitud + '');
    formData.append('precioMedio', restaurante.precioMedio + '');
    formData.append('especialidad1', restaurante.especialidad1);
    formData.append('especialidad2', restaurante.especialidad2);
    formData.append('especialidad3', restaurante.especialidad3);
    formData.append('archivo', archivo);

    return this.hhtp.post<Restaurante>(
      RestauranteService.URL_ACTUAL + '/crear-con-foto',
      formData
    );
  }

  // Metodo que comunica con el servidor  GET http://localhost:8081/restaurante/pagina?page=0&size=2
  getPaginaRestaurantes(page: number, size: number): Observable<any> {
    let parametros: HttpParams = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.hhtp.get<any>(RestauranteService.URL_ACTUAL + '/pagina', {
      params: parametros,
    });
  }

  ////GET http://localhost:8081/restaurante/buscarPorBarrioNombreOEspecialidad?clave=papa
  getRestaurantesPorTermino(termino: string): Observable<Array<Restaurante>> {
    //let parametros:HttpParams = new HttpParams().set('clave', termino);
    return this.hhtp.get<Array<Restaurante>>(
      RestauranteService.URL_ACTUAL + '/BuscarCualquierCosa/' + termino
    );
  }

  //Con PUT
  modificaRestauranteConFoto(restaurante: Restaurante, id: number, archivo: File): Observable<Restaurante> {

    let formData = new FormData();

    formData.append('nombre', restaurante.nombre);
    formData.append('direccion', restaurante.direccion);
    formData.append('barrio', restaurante.barrio);
    formData.append('web', restaurante.web);
    formData.append('fichaGoogle', restaurante.fichaGoogle);
    formData.append('latitud', restaurante.latitud + '');
    formData.append('longitud', restaurante.longitud + '');
    formData.append('precioMedio', restaurante.precioMedio + '');
    formData.append('especialidad1', restaurante.especialidad1);
    formData.append('especialidad2', restaurante.especialidad2);
    formData.append('especialidad3', restaurante.especialidad3);
    formData.append('archivo', archivo);
    
    return this.hhtp.put<Restaurante>(RestauranteService.URL_ACTUAL + `/editar-con-foto/`+id,formData);
  }
}
