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
  restaurante: any;
  idABuscar!: number;
 
  constructor(
    private restauranteService: RestauranteService,
    private servicioRutas: Router
  ) {}

  ngOnInit(): void {
    const restaurantId = this.idABuscar;
    
  }

  buscarRestaurante() {
    this.restauranteService.getRestauranteById(this.idABuscar).subscribe
    ({
      complete: () => console.log(`com completa`),
      next: (restauranteEncontrado: {
        id: number;
        nombre: any;
        direccion: any;
      }) => {
        if (restauranteEncontrado) {
          //this.idABuscar = restauranteEncontrado.id;
          console.log(
            `Restaurante consultado correctamente con nombre ${restauranteEncontrado.id} en la dirección ${restauranteEncontrado.direccion}`
          );
          this.restaurante = restauranteEncontrado;
          // Después de encontrar el restaurante, puedes redirigir al usuario al listado de restaurantes si es necesario.
          // this.servicioRutas.navigate(['/listados']);
        } else {
          alert(
            `No se encontró ningún restaurante con el nombre ${this.restaurante.id}`
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
