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
  restaurante: Restaurante = new  Restaurante();
  idABuscar!: number;
  cuerpo!: boolean;

  constructor(
    private restauranteService: RestauranteService,
    private servicioRutas: Router
  ) {}

  ngOnInit(): void {
    const restaurantId = this.idABuscar;
  }

  buscarRestaurante() {
    this.restauranteService.getRestauranteById(this.idABuscar).subscribe({
      complete: () => console.log(`com completa`),
      next: (restauranteEncontrado) => {
        if (restauranteEncontrado) {
          console.log(
            `Restaurante consultado correctamente con ID ${restauranteEncontrado.id} en la dirección ${restauranteEncontrado.direccion}`
          );
          this.cuerpo = true;
          this.restaurante = restauranteEncontrado;
          // Después de encontrar el restaurante, puedes redirigir al usuario al listado de restaurantes si es necesario.
          // this.servicioRutas.navigate(['/listados']);
        } else {
          alert(
            `No se encontró ningún restaurante con el ID ${this.idABuscar}`
          );
        }
      },
      error: (errorRx: any) => {
        console.error(errorRx);
        alert(`Error al consultar el restaurante ${this.restaurante.id}`);
      },
    });
  }
}
