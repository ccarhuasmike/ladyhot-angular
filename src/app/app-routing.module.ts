import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from "../app/view/not-found/not-found.component";
import { environment } from '../environments/environment';
import { ModuleWithProviders } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../app/view/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'home',
    loadChildren: () => import('../app/view/home/home.module').then(m => m.HomeModule)
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
  {
    path: 'kinesiologas/:provincia/:distrito/:descripcion',    
    loadChildren: () => import('../app/view/redireccionar-anuncio/redireccionar-anuncio.module').then(m => m.RedireccionarAnuncioModule)
  },
  {
    path: 'not-found',
    redirectTo: ''    
  },
  {
    path: '**',
    redirectTo: ''    
  }
];
export const AppRoutingModule: ModuleWithProviders<any> = RouterModule.forRoot(routes);

// @NgModule({
//   imports: [RouterModule.forRoot(routes, {useHash: false, relativeLinkResolution: 'legacy' })],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }