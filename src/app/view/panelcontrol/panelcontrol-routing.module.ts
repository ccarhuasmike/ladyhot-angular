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
                loadChildren: () => import('../../../app/view/panelcontrol/misanuncios/misanuncio.module#MisAnuncioModule').then(m => m.LazyModule)
            },
            {
                path: 'nuevoanuncio',
                loadChildren: () => import('../../../app/view/panelcontrol/anuncio/anuncio.module#AnuncioModule').then(m => m.LazyModule)
            },
            {
                path: 'contactar',
                component: ContactarComponent
            },
            {
                path: 'mantanuncio',
                loadChildren: () => import('../../../app/view/panelcontrol/mant-anuncio/mant-anuncio.module#MantAnuncioModule').then(m => m.LazyModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]

})
export class PanelControlRoutingModule { }

