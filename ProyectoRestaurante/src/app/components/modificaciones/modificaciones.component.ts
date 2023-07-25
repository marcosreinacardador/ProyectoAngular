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
  muestrame:boolean = false;

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
          this.muestrame=true;
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

    guardarCambios(){}

    seleccionarFoto(evento: Event) {
      console.log("foto cambiada");
      //evento.target //éste es el input file
      let input_file = evento.target as HTMLInputElement;
  
      if (input_file.files) {
  
  
        this.foto_seleccionada = input_file.files[0];
  
        console.log("Nombre fichero sel = " + this.foto_seleccionada.name);
        console.log("Tipo fichero sel = " + this.foto_seleccionada.type);
  
        // si es una imagen, perfecto "me la quedo" aqui sabemos si ha seleccionado
        // el usuario la foto
        if (this.foto_seleccionada.type.indexOf('image') >= 0) {
          console.log("el usuario ha seleccionado una imagen");
        } else {
          console.log("el usuario NO ha seleccionado una imagen");
          this.foto_seleccionada = null;
          //si no, la elimino, "no me la quedo"
        }
      }
    }

}
