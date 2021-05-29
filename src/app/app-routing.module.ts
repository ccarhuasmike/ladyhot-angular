import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from "../app/view/not-found/not-found.component";
import { environment } from '../environments/environment';
///
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../app/view/home/home.module#HomeModule').then(m => m.LazyModule),
    // redirectTo: '/home',
    // pathMatch: 'full'
  },
  //PRUEBA - Dante Cc. 
  {
    path: 'home',
    loadChildren: () => import('../app/view/home/home.module#HomeModule').then(m => m.LazyModule),
  },
  {
    path: 'about',
    loadChildren: () => import('../app/view/about/about.module#AboutModule').then(m => m.LazyModule)
  },
  {
    path: 'panelcontrol',
    loadChildren: () => import('../app/view/panelcontrol/panelcontrol.module#PanelControlModule').then(m => m.LazyModule)
  },
  {
    path: 'anunciategratis',
    loadChildren: () => import('../app/view/anunciategratis/anunciategratis.module#AnunciateGratisModule').then(m => m.LazyModule)
  },
  {
    path: 'seguridad',
    loadChildren: () => import('../app/view/seguridad/seguridad.module#SeguridadModule').then(m => m.LazyModule)
  },
  // {
  //   path: 'not-found',
  //   component: NotFoundComponent
  // },
  {
    path: 'kinesiologas/:provincia/:distrito/:descripcion',
    //path: 'kinesiologas/:id',
    loadChildren: () => import('../app/view/redireccionar-anuncio/redireccionar-anuncio.module#RedireccionarAnuncioModule').then(m => m.LazyModule)
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
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }