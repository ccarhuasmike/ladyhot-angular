import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { IndexComponent } from './index/index.component';
import { ListadoComponent } from './listado/listado.component';

const routes: Routes = [
    {
        path: '',
        component: IndexComponent
        // children: [
        //     {
        //         path: '',
        //         pathMatch: 'full',
        //         redirectTo: 'listado'
        //     },
        //     {
        //         path: 'listado',
        //         component: ListadoComponent
        //     }
        // ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MantenimientoAnuncioRoutingModule { }