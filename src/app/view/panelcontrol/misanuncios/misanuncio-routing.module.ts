import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarComponent } from './editar/editar.component';
import { GaleriaComponent } from './galeria/galeria.component';
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
                component: EditarComponent,
            },
            {
                path: "galeria/:id",
                component: GaleriaComponent,
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MisAnuncioRoutingModule { }
