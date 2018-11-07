import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnuncioComponent } from './anuncio/anuncio.component';
const routes: Routes = [
    {
        path: '',
        component: AnuncioComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AnuncioRoutingModule { }
