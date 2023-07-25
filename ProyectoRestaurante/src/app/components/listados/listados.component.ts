import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Restaurante } from 'src/app/models/restaurante';
import { RestauranteService } from 'src/app/services/restaurante.service';

@Component({
  selector: 'app-listados',
  templateUrl: './listados.component.html',
  styleUrls: ['./listados.component.css'],
})
export class ListadosComponent implements OnInit {

  // en caso de usarlo en modo local hay que documentar la siguiente linea
  ruta_servicio_foto :string = RestauranteService.URL_ACTUAL+"/obtenerFoto";

  lista_restaurantes = Array<Restaurante>();

  totalRegistros: number = 0;
  totalPorPagina: number = 3;
  opcionesTamanio: number[] = [3, 6, 9, 100];
  paginaActual: number = 0;

  constructor(
    private restauranteService: RestauranteService,
    private servicioRutas: Router
  ) {
    this.lista_restaurantes = new Array<Restaurante>();
  }

  // listado de restaurantes paginada, si queremos ver el listado completo esta en listados -copy

  ngOnInit(): void {
    this.getRestaurantesPorPaginas();    
    // this.restauranteService.getListaRestaurante().subscribe({
    //   complete: () => console.log('Comunicación completada'),
    //   error: (errorRx) => console.error(errorRx),
    //   next: (listaRestaurantesRx) => {
    //     console.log('Lista Restaurantes recibida éxito');
    //     listaRestaurantesRx.forEach((rest) => {
    //       console.log('Mostrando lista');

    //       console.log(`ID = ${rest.id} NOMBRE = ${rest.nombre}`);

    //       //  console.log(`ID = ${rest.id} NOMBRE = ${rest.nombre}`);
    //     });

    //     this.lista_restaurantes = listaRestaurantesRx;
    //   },
    // });
  }

  // element binding de paginator
  paginar(evento: PageEvent) {
    console.log('evento paginator');
    this.paginaActual = evento.pageIndex;
    this.totalPorPagina = evento.pageSize;
    this.getRestaurantesPorPaginas();  //llamamos y mete la lista de restaurantes actualizada con los parametros 
  }

  getRestaurantesPorPaginas(){
    this.restauranteService.getPaginaRestaurantes(this.paginaActual, this.totalPorPagina)
    .subscribe({
      complete: () => console.log('Comunicación completada'),
      error: (errorRx) =>  console.error(errorRx),
      next: (pagina) =>{
        // hago el casting
        this.lista_restaurantes= <Array<Restaurante>> pagina.content;  //para acceder al primero por ejemplo pagina.content[0].nombre;
        this.totalRegistros = pagina.totalElements;
      }

  });
  }

  eliminaRestaurante(id: number) {
    restaurante: Restaurante;
    console.log(`ID = ${id}`);
    this.restauranteService.borraRestaurante(id).subscribe({
      complete: () => console.log(`com completa`),
      error: (errorRx) => {
        console.error(errorRx);
        alert(`Error al eliminar el restaurante`);
      },
      next: (borraRestaurante) => {
        alert(`Restaurante eliminado correctamente con id ${id}`);
        window.location.reload();
        // tras el post exitoso redirigo al usuario al listado
        this.servicioRutas.navigate(['/listados']);
      },
    });
  }
}
