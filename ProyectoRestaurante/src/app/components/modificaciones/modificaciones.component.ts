import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurante } from 'src/app/models/restaurante';
import { RestauranteService } from 'src/app/services/restaurante.service';

@Component({
  selector: 'app-modificaciones',
  templateUrl: './modificaciones.component.html',
  styleUrls: ['./modificaciones.component.css']
})
export class ModificacionesComponent implements OnInit {
  
  @ViewChild('cajabusqueda') cajaInput!: ElementRef;
  
  //union type es un objeto de dos tipos, tambien se puede any
  foto_seleccionada!: File|null;  

  barrios: Array<String>;

  listaRestaurantes!: Array<Restaurante>;
  restauranteSel: Restaurante;
  muestrame:boolean = false;

  formulario:boolean = false;

  constructor(private rs: RestauranteService,  private servicioRutas: Router) {
    this.barrios = [
      'Selecciona barrio',
      'Centro',
      'Este',
      'Ciudad Jardín',
      'Bailén-Miraflores',
      'Palma-Palmilla',
      'Cruz de Humilladero',
      'Carretera de Cádiz',
      'Churriana',
      'Campanillas',
      'Puerto de la Torre',
      'Teatinos-Universidad',
      'Huelin',
      'El Palo'
    ];
  }
  
  ngOnInit(): void {}

  busqueda() {
    let terminoBusqueda: string = this.cajaInput.nativeElement.value;
    console.log('busqueda ' + terminoBusqueda);
    //TODO: consumir el servicio web de búsqueda
    //para traer los restaurantes que coincidan
    //con el término de búsqueda
    if (terminoBusqueda != '') {
      this.rs.getRestaurantesPorTermino(terminoBusqueda).subscribe({
        complete: () => console.log('completado'),
        error: (errorRx) => console.error(errorRx),
        next: (listaRestaurantesRx) => {
          this.listaRestaurantes = listaRestaurantesRx;
          
        },
      });
    } else {
      this.listaRestaurantes.length = 0;
    }
  }

  restaurateTocado(restaurante: Restaurante) {
        
        this.listaRestaurantes.length = 0;
     
      console.log('Nombre tocado = ' + restaurante.nombre);
      alert('Nombre tocado = ' + restaurante.nombre + ' id ' + restaurante.id);
    }

    

   

    modificarRestaurante(restaurante: Restaurante) {
      this.formulario = true;
      let formu = JSON.stringify(this.formulario)
      sessionStorage.setItem('formulario', formu)
      this.restauranteSel = restaurante;
      this.servicioRutas.navigateByUrl('/ficha');
      console.log(this.restauranteSel);
      let restlocal = JSON.stringify(this.restauranteSel);
      localStorage.setItem('restauranteSel',restlocal); 
    }

    

}
