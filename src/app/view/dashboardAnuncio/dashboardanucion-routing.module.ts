import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreDashboardComponent } from './coredashboard/coredashboard.component';
import { MisAnunciosComponent } from './misanuncios/coremisanuncios/misanuncios.component';
import { ContactarComponent } from './contactar/contactar.component';
import { HomeModule } from '../home/home.module';
// import { DatosContactoComponent } from "./anuncio/datoscontacto/datoscontactos.component";
// import { DatosGeneralesComponent } from "./anuncio/datosgenerales/datosgenerales.component";
// import { AparienciaComponent } from "./anuncio/apariencia/apariencia.component";
// import { TarifasComponent } from "./anuncio/tarifa/tarifas.component";
// import { ServiciosComponent } from "./anuncio/servicios/servicios.component";
// import { GaleriaComponent } from "./anuncio/galeria/galeria.component";
// import { MisAnunciosComponent } from "./misanuncios/misanuncios.component";
const routes: Routes = [
    {
        path: '',
        component: CoreDashboardComponent,
        children: [
            {
                path: 'misanuncios',
                loadChildren: '../../../app/view/dashboardAnuncio/misanuncios/misanuncio.module#MisAnuncioModule'
            },
            {
                path: 'nuevoanuncio',
                loadChildren: '../../../app/view/dashboardAnuncio/anuncio/anuncio.module#AnuncioModule'
            },
            {
                path: 'contactar',
                component: ContactarComponent
            },
            {
                path: 'salir',

            }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]

})
export class DashboadAnuncioRoutingModule { }

