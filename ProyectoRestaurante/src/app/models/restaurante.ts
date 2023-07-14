/*
{
        "id": 1,
        "nombre": "Martinete",
        "direccion": "Carlos Haya 33",
        "barrio": "Carranque",
        "web": "www.martinete.org",
        "fichaGoogle": "http://dkdkskksdk.coe",
        "latitud": 33.65,
        "longitud": -2.3,
        "precioMedio": 10,
        "especialidad1": "gazpachuelo",
        "especialidad2": "paella",
        "especialidad3": "sopa de marisco",
        "creadoEN": "2023-06-28T18:41:23.897042"
    },
*/

export class Restaurante {
    
    id:number;
    nombre:string;
    direccion:string;
    barrio:string;
    web:string;
    fichaGoogle:string;
    latitud:number;
    longitud:number;
    precioMedio:number;
    especialidad1:string;
    especialidad2:string;
    especialidad3:string;

    constructor(){
    this.id = 0;
    this.nombre = '';
    this.direccion = '';
    this.barrio = '';
    this.web = '';
    this.fichaGoogle = '';
    this.latitud = 0;
    this.longitud = 0;
    this.precioMedio = 0;
    this.especialidad1 = '';
    this.especialidad2 = '';
    this.especialidad3 = '';
    }
}
