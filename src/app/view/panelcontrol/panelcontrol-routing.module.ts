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
                loadChildren: () => import('../../../app/view/panelcontrol/misanuncios/misanuncio.module').then(m => m.MisAnuncioModule)
            },
            {
                path: 'nuevoanuncio',
                loadChildren: () => import('../../../app/view/panelcontrol/anuncio/anuncio.module').then(m => m.AnuncioModule)
            },
            {
                path: 'contactar',
                component: ContactarComponent
            },
            {
                path: 'mantanuncio',
                loadChildren: () => import('../../../app/view/panelcontrol/mant-anuncio/mant-anuncio.module').then(m => m.MantAnuncioModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]

})
export class PanelControlRoutingModule { }

