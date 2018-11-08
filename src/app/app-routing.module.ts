import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from "../app/view/not-found/not-found.component";
import { PanelControlComponent } from "../app/view/panelcontrol/panelcontrol.component";
const routes: Routes = [
  {
    path: '',
    loadChildren: '../app/view/home/home.module#HomeModule'
  },
  {
    path: 'about',
    loadChildren: '../app/view/about/about.module#AboutModule'
  },
  {
    path: 'anuncio',
    loadChildren: '../app/view/anuncio/anuncio.module#AnuncioModule'
  },
  {
    path: 'panelcontrol',
    component: PanelControlComponent,
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
