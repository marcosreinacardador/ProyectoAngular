import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListadosComponent } from './components/listados/listados.component';
import { AltasComponent } from './components/altas/altas.component';
//import { BajasComponent } from './components/listados/listados.component';
import { ConsultasComponent } from './components/consultas/consultas.component';
import { ModificacionesComponent } from './components/modificaciones/modificaciones.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ListadosComponent,
    AltasComponent,
 //   BajasComponent,
    ConsultasComponent,
    ModificacionesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
