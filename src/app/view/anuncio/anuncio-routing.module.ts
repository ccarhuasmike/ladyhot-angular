import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnuncioComponent } from './anuncio/anuncio.component';
import { DatosContactoComponent } from "./anuncio/datoscontacto/datoscontactos.component";
import { DatosGeneralesComponent } from "./anuncio/datosgenerales/datosgenerales.component";
import { AparienciaComponent } from "./anuncio/apariencia/apariencia.component";
import { TarifasComponent } from "./anuncio/tarifa/tarifas.component";
import { ServiciosComponent } from "./anuncio/servicios/servicios.component";
const routes: Routes = [
    {
        path: '',
        component: AnuncioComponent,
        children: [
            {
                path: "datos-contacto",
                component: DatosContactoComponent
            },
            {
                path: "datos-generales",
                component: DatosGeneralesComponent
            },
            {
                path: "apariencia",
                component: AparienciaComponent
            },
            {
                path: "tarifa",
                component: TarifasComponent
            },
            {
                path: "servicios",
                component: ServiciosComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AnuncioRoutingModule { }
