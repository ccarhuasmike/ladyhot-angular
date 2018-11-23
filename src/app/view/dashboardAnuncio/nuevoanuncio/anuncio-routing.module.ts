import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnuncioComponent } from './anuncio/anuncio.component';
import { DatosContactoComponent } from "./anuncio/datoscontacto/datoscontactos.component";
import { DatosGeneralesComponent } from "./anuncio/datosgenerales/datosgenerales.component";
import { AparienciaComponent } from "./anuncio/apariencia/apariencia.component";
import { TarifasComponent } from "./anuncio/tarifa/tarifas.component";
import { ServiciosComponent } from "./anuncio/servicios/servicios.component";
import { GaleriaComponent } from "./anuncio/galeria/galeria.component";

const routes: Routes = [
    {
        path: '',
        component: AnuncioComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'datos-contacto'
            },
            {
                path: "datos-contacto",
                component: DatosContactoComponent,
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
            },
            {
                path: "galeria",
                component: GaleriaComponent
            }

        ]
    },
    {
        path: '',
        component: AnuncioComponent
    },
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
