import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from "../app/view/not-found/not-found.component";
import { BotonPasarelaPagoComponent } from './view/pasarela-pago/boton-pasarela-pago/boton-pasarela-pago.component';

///
const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  //PRUEBA - Dante Cc. 
  {
    path: 'pasarela',
    component: BotonPasarelaPagoComponent
  },
  //PRUEBA - Dante Cc. 
  {
    path: 'home',
    loadChildren: '../app/view/home/home.module#HomeModule',
  },
  {
    path: 'about',
    loadChildren: '../app/view/about/about.module#AboutModule'
  },
  {
    path: 'panelcontrol',
    loadChildren: '../app/view/panelcontrol/panelcontrol.module#PanelControlModule'
  },
  {
    path: 'anunciategratis',
    loadChildren: '../app/view/anunciategratis/anunciategratis.module#AnunciateGratisModule'
  },
  {
    path: 'seguridad',
    loadChildren: '../app/view/seguridad/seguridad.module#SeguridadModule'
  },
  {
    path: 'productos',
    loadChildren: '../app/view/productos/productos.module#ProductosModule'
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
