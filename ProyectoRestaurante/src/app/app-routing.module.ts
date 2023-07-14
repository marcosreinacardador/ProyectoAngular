import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListadosComponent } from './components/listados/listados.component';
import { AltasComponent } from './components/altas/altas.component';
import { BajasComponent } from './components/bajas/bajas.component';
import { ConsultasComponent } from './components/consultas/consultas.component';
import { ModificacionesComponent } from './components/modificaciones/modificaciones.component';

const routes: Routes = [
  {path:"listados", component: ListadosComponent},
  {path:"altas", component: AltasComponent},
  {path:"baja", component: BajasComponent},
  {path:"consultas", component: ConsultasComponent},
  {path:"modificaciones", component: ModificacionesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }