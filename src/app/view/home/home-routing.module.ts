import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactarPublicoComponent } from './contactar-publico/contactar-publico.component';
import { IndexComponent } from './index/index.component';
const routes: Routes = [
    {
        path: '',
        component: IndexComponent
    },
    {
        path: 'contactar-cliente',
        component: ContactarPublicoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
