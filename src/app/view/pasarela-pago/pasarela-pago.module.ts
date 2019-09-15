import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotonPasarelaPagoComponent } from './boton-pasarela-pago/boton-pasarela-pago.component';
import { NgxStripeModule } from 'ngx-stripe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasarelaPagoService } from 'src/app/shared/services/pasarela-pago/pasarela-pago';
import { ModalModule } from 'ngx-bootstrap';
import { ModalPasarelaPagoComponent } from './modal-pasarela-pago/pasarela-pago.component';

@NgModule({
  declarations: [
    //PRUEBA - Dante Cc. 
    BotonPasarelaPagoComponent,
    ModalPasarelaPagoComponent
    //PRUEBA - Dante Cc. 
  ],
  imports: [
    CommonModule,
    //PRUEBA - Dante Cc. 
    NgxStripeModule.forRoot("pk_test_SVVqZc4cQMPx8dXubJbMPon000bs0VtVZN"),
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
    //PRUEBA - Dante Cc. 
  ],
  providers: [
    //PRUEBA - Dante Cc. 
    PasarelaPagoService
    //PRUEBA - Dante Cc. 
  ],
  entryComponents: [
    ModalPasarelaPagoComponent
  ]
})
export class PasarelaPagoModule { }
