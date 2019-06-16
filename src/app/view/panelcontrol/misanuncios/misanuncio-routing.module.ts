import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditarAnuncioComponent } from './editanuncio/editanuncio.component';
import { GaleriaAnuncioComponent } from './galerianuncio/galerianuncio.component';
import { IndexComponent } from "./index/index.component";
import { DarBajaComponent } from './darbaja/darbaja.component';
const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: IndexComponent,
                pathMatch: 'full'
            },
            {
                path: "darbaja/:id",
                component: DarBajaComponent,

            },
            {
                path: "editar/:id",
                component: EditarAnuncioComponent,
            },
            {
                path: "galeria/:id",
                component: GaleriaAnuncioComponent,
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MisAnuncioRoutingModule { }
