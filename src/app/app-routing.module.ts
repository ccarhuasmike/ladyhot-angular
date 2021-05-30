import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from "../app/view/not-found/not-found.component";
import { environment } from '../environments/environment';
//
const routes: Routes = [
  {
    path: '',
    //loadChildren: () => import('../app/view/home/home.module').then(m => m.HomeModule)
    loadChildren: '../app/view/home/home.module#HomeModule'
    //loadChildren: () => import('../app/view/home/home.module#HomeModule').then(m => m.HomeModule),
    // redirectTo: '/home',
    // pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: '../app/view/home/home.module#HomeModule'
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
  // {
  //   path: 'not-found',
  //   component: NotFoundComponent
  // },
  {
    path: 'kinesiologas/:provincia/:distrito/:descripcion',
    //path: 'kinesiologas/:id',
    loadChildren: '../app/view/redireccionar-anuncio/redireccionar-anuncio.module#RedireccionarAnuncioModule'
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
  imports: [RouterModule.forRoot(routes, { useHash: false, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }