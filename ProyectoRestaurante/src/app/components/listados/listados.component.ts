import { Component, OnInit } from '@angular/core';
import { Restaurante } from 'src/app/models/restaurante';
import { RestauranteService } from 'src/app/services/restaurante.service';


@Component({
  selector: 'app-listados',
  templateUrl: './listados.component.html',
  styleUrls: ['./listados.component.css']
})
export class ListadosComponent implements OnInit{

  lista_restaurantes = Array<Restaurante>();

  constructor(private restauranteService:RestauranteService){ 
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
    /**mostrarListaRestaurantes(): void{
      console.log("Mostrando lista");
      this.lista_restaurantes.forEach(d => {
        console.log(`ID = ${rest.id} NOMBRE = ${rest.nombre}`)
      }
    )}
    */
  }
  borrarRestaurante(){
    console.log("Borrando el restaurante");
  }
  

}
