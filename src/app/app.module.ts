import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from '../app/view/not-found/not-found.component';
import { CoreModule } from '../app/view/core/core.module';
import { SharedModule } from './shared/shared.module';
//PRUEBA - Dante Cc. 
import { PasarelaPagoComponent } from './view/pasarela-pago/pasarela-pago.component';
import { NgxStripeModule } from 'ngx-stripe';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PasarelaPagoService } from './shared/services/pasarela-pago/pasarela-pago';
//PRUEBA - Dante Cc. 
// import { IndexComponent } from "../app/view/home/index/index.component";
// import { NgxMasonryModule } from 'ngx-masonry';
// import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    //PRUEBA - Dante Cc. 
    PasarelaPagoComponent
    //PRUEBA - Dante Cc. 
    //IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    // NgxMasonryModule,
    // InfiniteScrollModule
    //PRUEBA - Dante Cc. 
    NgxStripeModule.forRoot("pk_test_SVVqZc4cQMPx8dXubJbMPon000bs0VtVZN"),
    FormsModule,
    ReactiveFormsModule
    //PRUEBA - Dante Cc. 
  ],
  providers: [
    //PRUEBA - Dante Cc. 
    PasarelaPagoService
    //PRUEBA - Dante Cc. 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
