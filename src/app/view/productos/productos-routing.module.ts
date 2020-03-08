import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { SubirAutomaticoComponent } from './subir-automatico/subir-automatico.component';
import { TopAnuncioComponent } from './top-anuncio/top-anuncio.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'subir-automatico',
        component: SubirAutomaticoComponent
      },
      {
        path: 'top-anuncio',
        component: TopAnuncioComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
