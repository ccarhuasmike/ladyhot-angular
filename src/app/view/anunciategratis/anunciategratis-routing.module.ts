import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/indexcomponent';
import { DatosContactoComponent } from "../../view/panelcontrol/anuncio/datoscontacto/datoscontactos.component";
import { DatosGeneralesComponent } from "../../view/panelcontrol/anuncio/datosgenerales/datosgenerales.component";
import { AparienciaComponent } from "../../view/panelcontrol/anuncio/apariencia/apariencia.component";
import { TarifasComponent } from "../../view/panelcontrol/anuncio/tarifa/tarifas.component";
import { ServiciosComponent } from "../../view/panelcontrol/anuncio/servicios/servicios.component";
import { GaleriaComponent } from "../../view/panelcontrol/anuncio/galeria/galeria.component";
const routes: Routes = [
    {
        path: '',
        component: IndexComponent,
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
export class AnunciateGratisRoutingModule { }

