import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { RestauranteService } from 'src/app/services/restaurante.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})

export class MapaComponent implements OnInit {

  private map!:any;

  constructor(private rs: RestauranteService) {
   }
   
   

  ngOnInit(): void {
    this.initMap();
  }

  private initMap():void{
    this.map = L.map('map', {
      center: [ 36.7316787,-4.4651259 ],
      zoom: 20
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    //circle.bindPopup("I am a circle.");
    tiles.addTo(this.map);
    
  }

  
  
  dibujarPunto(latitud:number, longitud:number) {
   
    L.marker([latitud, longitud]).addTo(this.map)
    .bindPopup('Su restaurante se encuentra aqui')
    .openPopup();
  }

  dibujarPosicion (latitude:number, longitude:number)
  {

    var myIcon = L.icon({
      iconUrl: '/assets/ubicacion.png',
      iconSize: [38, 95],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      //shadowUrl: '/assets/sombra.png',
      //shadowSize: [68, 95],
      //shadowAnchor: [22, 94]
  });

    //USO EL API DE LEAFLET //https://leafletjs.com/examples/quick-start/
    let nivel_de_zoom = 12;

    this.map.setView([latitude, longitude], nivel_de_zoom);//
    //coordenadas del Estadio del Madrid 40.4530387,-3.6883337
    var marker = L.marker([latitude, longitude], {icon:myIcon}).addTo(this.map);
    var circle = L.circle([latitude, longitude], {
      color: 'blue',
      fillColor: '#000',
      fillOpacity: 0.5,
      radius: 150
  }).addTo(this.map);
  }  



}
