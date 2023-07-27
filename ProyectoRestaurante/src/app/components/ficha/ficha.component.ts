import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurante } from 'src/app/models/restaurante';
import { RestauranteService } from 'src/app/services/restaurante.service';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit{
  mostrarContenido: boolean = false;
  @ViewChild('cajabusqueda') cajaInput!: ElementRef;
  
  //union type es un objeto de dos tipos, tambien se puede any
  foto_seleccionada!: File|null;  

  barrios: Array<String>;

  restaurante: Restaurante;
  restauranteSeleccionado: Restaurante;
  restauranteSel!: Restaurante;
  muestrame:boolean = false;

  formulario:boolean = false;

  

  constructor(private rs: RestauranteService,  private servicioRutas: Router){
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
  ngOnInit(): void {
 
      let restauranteString : any = localStorage.getItem('restauranteSel');
      this.restauranteSel = JSON.parse(restauranteString);
      let formularioString : any = sessionStorage.getItem('formulario');
      this.formulario = JSON.parse(formularioString);
     // this.mostrarContenido = this.formulario;
     console.log(this.formulario, "soyformdefivha");
     console.log(this.restauranteSel, "soy rest sel");
  }

  toggleMostrarContenido(restaurante: Restaurante) {
    this.mostrarContenido = !this.mostrarContenido;
    
  }



  modificarRestaurante(restaurante: Restaurante) {
    
      if (this.restauranteSel) {
        // Aquí asumimos que ya tienes el restaurante seleccionado para modificar en la variable restauranteSel
  
        // Asigna los valores modificados de restauranteSel al objeto restaurante
        this.restaurante.nombre = this.restauranteSel.nombre;
        this.restaurante.direccion = this.restauranteSel.direccion;
        this.restaurante.barrio = this.restauranteSel.barrio;
        this.restaurante.web = this.restauranteSel.web;
        this.restaurante.fichaGoogle = this.restauranteSel.fichaGoogle;
        this.restaurante.latitud = this.restauranteSel.latitud;
        this.restaurante.longitud = this.restauranteSel.longitud;
        this.restaurante.precioMedio = this.restauranteSel.precioMedio;
        this.restaurante.especialidad1 = this.restauranteSel.especialidad1;
        this.restaurante.especialidad2 = this.restauranteSel.especialidad2;
        this.restaurante.especialidad3 = this.restauranteSel.especialidad3;


      // Luego, puedes llamar a tu servicio para enviar la solicitud PUT con los datos actualizados del restaurante
      this.rs.modificaRestauranteConFoto(restaurante, this.restauranteSeleccionado.id).subscribe({
        complete: () => console.log('Comunicación completada'),
        error: (error) => {
          console.error(error);
          alert('Error al modificar el restaurante');
        },
        next: () => {
          alert('Restaurante modificado correctamente');
          this.servicioRutas.navigateByUrl('/restaurantes');
        },
      });
    } else {
      // Manejo de error si no se ha seleccionado ningún restaurante para modificar
      console.error('Error: No se ha seleccionado un restaurante para modificar');
      alert('Error: No se ha seleccionado un restaurante para modificar');
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
