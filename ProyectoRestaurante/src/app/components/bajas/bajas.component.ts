import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurante } from 'src/app/models/restaurante';
import { RestauranteService } from 'src/app/services/restaurante.service';

@Component({
  selector: 'app-bajas',
  templateUrl: './bajas.component.html',
  styleUrls: ['./bajas.component.css'],
})
export class BajasComponent implements OnInit {
  restaurante: Restaurante;

  constructor(
    private restauranteService: RestauranteService,
    private servicioRutas: Router
  ) {
    this.restaurante = new Restaurante();
  }

  ngOnInit(): void {}

  borrarRestaurante(id: number){
    
      this.restauranteService.deleteRestaurante(id).subscribe({
        complete: () => console.log(`com completa`),
        error: (errorRx) => {
        console.error(errorRx);
        alert(`Error al eliminar el restaurante`);
      },
      next: (deleteRestaurante) => {
        alert(
          `Restaurante eliminado correctamente con id ${deleteRestaurante.id}`
        );
        // tras el post exitoso redirigo al usuario al listado
         this.servicioRutas.navigate(['/listados']);
      },
    });
  }
  

}
