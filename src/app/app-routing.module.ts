import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from "../app/view/not-found/not-found.component";
import { BotonPasarelaPagoComponent } from './view/pasarela-pago/boton-pasarela-pago/boton-pasarela-pago.component';

///
const routes: Routes = [
  {
    path: '',
    loadChildren: '../app/view/home/home.module#HomeModule',
    // redirectTo: '/home',
    // pathMatch: 'full'
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
    path: 'kinesiologas/:id',
    loadChildren: '../app/view/redireccionar-anuncio/redireccionar-anuncio.module#RedireccionarAnuncioModule',
  },
  {
    path: 'not-found',
    redirectTo: ''
    //component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: ''
    //redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
