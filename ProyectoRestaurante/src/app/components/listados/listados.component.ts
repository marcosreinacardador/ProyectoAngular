import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurante } from 'src/app/models/restaurante';
import { RestauranteService } from 'src/app/services/restaurante.service';


@Component({
  selector: 'app-listados',
  templateUrl: './listados.component.html',
  styleUrls: ['./listados.component.css']
})
export class ListadosComponent implements OnInit{

  lista_restaurantes = Array<Restaurante>();
  

  constructor(private restauranteService:RestauranteService, private servicioRutas: Router){ 
    this.lista_restaurantes = new Array<Restaurante>;
    
  }

  ngOnInit(): void {
    this.restauranteService.getListaRestaurante().subscribe(
      {
        complete: () => console.log('Comunicación completada'),
        error: (errorRx) => {
          console.error(errorRx);
        },
        next: (listaRestaurantesRx) => {
          console.log('Lista Restaurantes recibida éxito');
          listaRestaurantesRx.forEach(
            rest => {
                console.log("Mostrando lista");
                
                  console.log(`ID = ${rest.id} NOMBRE = ${rest.nombre}`)

                
              
              
            //  console.log(`ID = ${rest.id} NOMBRE = ${rest.nombre}`);
            }
          );
          
          this.lista_restaurantes = listaRestaurantesRx;
        }

      }
    );
  }
  
  borrarRestaurante(id: number){
    
    restaurante: Restaurante;
    console.log(`ID = ${id}`);
    this.restauranteService.borraRestaurante(id).subscribe({
      complete: () => console.log(`com completa`),
      error: (errorRx) => {
      console.error(errorRx);
      alert(`Error al eliminar el restaurante`);
    },
    next: (borraRestaurante) => {
      alert(
        `Restaurante eliminado correctamente con id ${id}`
      );
      
      // tras el post exitoso redirigo al usuario al listado
       this.servicioRutas.navigate(['/listados']);
    },
  });
}
  

}
