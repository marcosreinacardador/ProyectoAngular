import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurante } from 'src/app/models/restaurante';
import { RestauranteService } from 'src/app/services/restaurante.service';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css'],
})
export class ConsultasComponent implements OnInit {
  restaurante: Restaurante;
  
  
  ngOnInit(): void {}

  constructor(
    private restauranteService: RestauranteService,
    private servicioRutas: Router
  ) {
    this.restaurante = new Restaurante();
  }

  buscarRestaurante() {
    restaurante: Restaurante;
    console.log(`ID = ${this.restaurante.nombre}`);
    this.restauranteService.buscarRestaurante(this.restaurante.nombre).subscribe({
      complete: () => console.log(`com completa`),
      error: (errorRx) => {
        console.error(errorRx);
        alert(`Error al consultar un restaurante`);
       // this.nombreEncontrado = null;
      },
      next: (buscarRestaurante) => {
        alert(
          `Restaurante consultado correctamente con nombre ${this.restaurante.nombre}`
          //this.nombreEncontrado = buscarRestaurante;
        );

        // tras el post exitoso redirigo al usuario al listado
        // this.servicioRutas.navigate(['/listados']);
      },
    });
  }
}
