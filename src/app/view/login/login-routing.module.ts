import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngresarComponent } from './index/index.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'ingresar',
        pathMatch: 'full'
    },
    {
        path: 'ingresar',
        component: IngresarComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule {
}