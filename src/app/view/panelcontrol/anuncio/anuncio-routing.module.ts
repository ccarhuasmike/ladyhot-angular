import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnuncioComponent } from './anuncio.component';
import { DatosContactoComponent } from "./datoscontacto/datoscontactos.component";
import { DatosGeneralesComponent } from "./datosgenerales/datosgenerales.component";
import { AparienciaComponent } from "./apariencia/apariencia.component";
import { TarifasComponent } from "./tarifa/tarifas.component";
import { ServiciosComponent } from "./servicios/servicios.component";
import { GaleriaComponent } from "./galeria/galeria.component";

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
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AnuncioRoutingModule { }
