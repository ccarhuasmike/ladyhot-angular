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
                redirectTo: 'misanucios',
                pathMatch: 'full'
            },
            {
                path: "darbaja",
                component: DarBajaComponent,
            },
            {
                path: "misanucios",
                component: MisAnunciosComponent,
            },
            {
                path: "editar",
                component: EditarAnuncioComponent,
            },
            {
                path: "galeria",
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
