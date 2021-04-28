import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { VerAnuncioComponent } from "./ver-anuncio/ver-anuncio.component";

const routes: Routes = [
    {
        path: '',
        component: VerAnuncioComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class RedireccionarAnuncioRoutingModule { }