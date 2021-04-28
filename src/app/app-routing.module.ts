import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from "../app/view/not-found/not-found.component";

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
<<<<<<< HEAD
  },  
  {
    path: 'not-found',
    component: NotFoundComponent
=======
  },
  {
    path: 'kinesiologas/:id',
    loadChildren: '../app/view/redireccionar-anuncio/redireccionar-anuncio.module#RedireccionarAnuncioModule',
  },
  {
    path: 'not-found',
    redirectTo: ''
    //component: NotFoundComponent
>>>>>>> a9c15376af33655882823e5459059566832f7c12
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