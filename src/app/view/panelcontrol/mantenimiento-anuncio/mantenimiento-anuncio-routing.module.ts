import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MantenimientoAnuncioComponent } from './mantenimiento-anuncio.component';
import { ListadoComponent } from './listado/listado.component';

const routes: Routes = [
    {
        path: '',
        component: MantenimientoAnuncioComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'listado'
            },
            {
                path: 'listado',
                component: ListadoComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MantenimientoAnuncioRoutingModule { }