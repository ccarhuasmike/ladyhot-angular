import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from '../app/view/not-found/not-found.component';
import { CoreModule } from '../app/view/core/core.module';
import { SharedModule } from './shared/shared.module';
import { PasarelaPagoModule } from './view/pasarela-pago/pasarela-pago.module';
// import { IndexComponent } from "../app/view/home/index/index.component";
// import { NgxMasonryModule } from 'ngx-masonry';
// import { InfiniteScrollModule } from 'ngx-infinite-scroll';
// import { DatosContactoComponent } from "./view/panelcontrol/anuncio/datoscontacto/datoscontactos.component";
// import { DatosGeneralesComponent } from "./view/panelcontrol/anuncio/datosgenerales/datosgenerales.component";
// import { AparienciaComponent } from "./view/panelcontrol/anuncio/apariencia/apariencia.component";
// import { TarifasComponent } from "./view/panelcontrol/anuncio/tarifa/tarifas.component";
// import { ServiciosComponent } from "./view/panelcontrol/anuncio/servicios/servicios.component";
// import { GaleriaComponent } from "./view/panelcontrol/anuncio/galeria/galeria.component";
@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    //IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    //PRUEBA - Dante Cc. 
    PasarelaPagoModule
    //PRUEBA - Dante Cc. 
    // NgxMasonryModule,
    // InfiniteScrollModule
  ],
  // entryComponents: [
  //   DatosContactoComponent,
  //   DatosGeneralesComponent,
  //   AparienciaComponent,
  //   TarifasComponent,
  //   ServiciosComponent,    
  //   GaleriaComponent        
  // ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
