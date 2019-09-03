import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/indexcomponent';
import { ContactarComponent } from './contactar/contactar.component';
const routes: Routes = [
    {
        path: '',
        component: IndexComponent,
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
                path: 'mantanuncio',
                loadChildren: '../../../app/view/panelcontrol/mant-anuncio/mant-anuncio.module#MantAnuncioModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]

})
export class PanelControlRoutingModule { }

