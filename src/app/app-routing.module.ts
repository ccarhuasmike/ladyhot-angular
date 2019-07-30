import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from "../app/view/not-found/not-found.component";
//import { IndexComponent } from "../app/view/home/index/index.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    // component :  IndexComponent
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
    path: 'login',
    loadChildren: '../app/view/seguridad/seguridad.module#SeguridadModule'
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
