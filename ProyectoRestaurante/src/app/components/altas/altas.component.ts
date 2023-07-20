import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurante } from 'src/app/models/restaurante';
import { RestauranteService } from 'src/app/services/restaurante.service';

@Component({
  selector: 'app-altas',
  templateUrl: './altas.component.html',
  styleUrls: ['./altas.component.css'],
})
export class AltasComponent implements OnInit {
  restaurante: Restaurante;
  barrios: Array<String>;

  //union type es un objeto de dos tipos, tambien se puede any
  foto_seleccionada!: File|null;  

  // el servicio router me permite navegar programaticamante
  constructor(
    private restauranteService: RestauranteService,
    private servicioRutas: Router
  ) {
    this.restaurante = new Restaurante();

    this.restaurante.nombre = 'El Cateto';
    this.restaurante.direccion = 'La fuente s/n';
    this.restaurante.barrio = 'Este';
    this.restaurante.web = 'http://www.elcateto.org';
    this.restaurante.fichaGoogle = 'http://www.google.elcateto.org';
    this.restaurante.latitud = 30;
    this.restaurante.longitud = 30;
    this.restaurante.precioMedio = 10;
    this.restaurante.especialidad1 = 'Marisco';
    this.restaurante.especialidad2 = 'Pescado';
    this.restaurante.especialidad3 = 'Carne';

this.barrios = [
      '---',
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
    ];
  }

  ngOnInit(): void {
    console.log('enviar los datos');
    console.log(`Restaurante 
   ${this.restaurante.nombre}
   ${this.restaurante.direccion}
   ${this.restaurante.barrio}
   ${this.restaurante.web}
   ${this.restaurante.fichaGoogle}
   ${this.restaurante.latitud}
   ${this.restaurante.longitud}
   ${this.restaurante.precioMedio}
   ${this.restaurante.especialidad1}
   ${this.restaurante.especialidad2}
   ${this.restaurante.especialidad3}
  `);
  }

  guardarRestaurante() {
    
    if(this.foto_seleccionada!=null){
      // llamar a post con foto
      this.restauranteService.postRestauranteConFoto(this.restaurante, this.foto_seleccionada).subscribe({
        complete: () => console.log(`com completa`),
        error: (errorRx) => {
          console.error(errorRx);
          alert(`Error al insertar el restaurante`);
        },
        next: restauranteNuevo => {
          alert(
            `Restaurante insertado correctamente con id ${restauranteNuevo.id}`
          );
          // tras el post exitoso redirigo al usuario al listado
          this.servicioRutas.navigateByUrl('/altas');
          this.servicioRutas.navigate(['/listados']);
        },
      });
    } else {
      // llamar a post normal
      this.restauranteService.postRestaurante(this.restaurante).subscribe({
        complete: () => console.log(`com completa`),
        error: (errorRx) => {
          console.error(errorRx);
          alert(`Error al insertar el restaurante`);
        },
        next: restauranteNuevo => {
          alert(
            `Restaurante insertado correctamente con id ${restauranteNuevo.id}`
          );
          // tras el post exitoso redirigo al usuario al listado
          this.servicioRutas.navigateByUrl('/altas');
          this.servicioRutas.navigate(['/listados']);
        },
      });
    }
  }

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
