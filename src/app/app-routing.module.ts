import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from "../app/view/not-found/not-found.component";
import { environment } from '../environments/environment';
//
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../app/view/home/home.module').then(m => m.HomeModule)
    //loadChildren: '../app/view/home/home.module#HomeModule'
    //loadChildren: () => import('../app/view/home/home.module#HomeModule').then(m => m.HomeModule),
    // redirectTo: '/home',
    // pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('../app/view/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'about',
    loadChildren: () => import('../app/view/about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'panelcontrol',
    loadChildren: () => import('../app/view/panelcontrol/panelcontrol.module').then(m => m.PanelControlModule)
  },
  {
    path: 'anunciategratis',
    loadChildren: () => import('../app/view/anunciategratis/anunciategratis.module').then(m => m.AnunciateGratisModule)
  },
  {
    path: 'seguridad',
    loadChildren: () => import('../app/view/seguridad/seguridad.module').then(m => m.SeguridadModule)
  },
  // {
  //   path: 'not-found',
  //   component: NotFoundComponent
  // },
  {
    path: 'kinesiologas/:provincia/:distrito/:descripcion',
    //path: 'kinesiologas/:id',
    loadChildren: () => import('../app/view/redireccionar-anuncio/redireccionar-anuncio.module').then(m => m.RedireccionarAnuncioModule)
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