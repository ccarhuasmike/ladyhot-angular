import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditarAnuncioComponent } from './editanuncio/editanuncio.component';
import { GaleriaAnuncioComponent } from './galerianuncio/galerianuncio.component';
import { MisAnunciosComponent } from "./coremisanuncios/misanuncios.component";
import { DarBajaComponent } from './darbaja/darbaja.component';
const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'misanuncios',
                pathMatch: 'full'
            },
            {
                path: "darbaja/:id",
                component: DarBajaComponent,

            },
            {
                path: "misanuncios",
                component: MisAnunciosComponent,
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
