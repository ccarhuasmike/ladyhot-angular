import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { indexComponent } from './index/indexcomponent';
import { ContactarComponent } from './contactar/contactar.component';

const routes: Routes = [
    {
        path: '',
        component: indexComponent,
        children: [
            {
                path: 'misanuncios',
                loadChildren: '../../../app/view/panelcontrol/misanuncios/misanuncio.module#MisAnuncioModule'
            },
            {
                path: 'nuevoanuncio',
                loadChildren: '../../../app/view/panelcontrol/anuncio/anuncio.module#AnuncioModule'
            },
            {
                path: 'contactar',
                component: ContactarComponent
            },
            {
                path: 'mantenimiento-anuncio',
                loadChildren: '../../../app/view/panelcontrol/mantenimiento-anuncio/mantenimiento-anuncio.module#MantenimientoAnuncioModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]

})
export class PanelControlRoutingModule { }

